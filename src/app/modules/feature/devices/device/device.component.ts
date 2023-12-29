import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/shared/services/api.service';
import { CommonActionPopupComponent } from 'src/app/shared/components/common-action-popup/common-action-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { DeviceActionsComponent } from '../device-actions/device-actions.component';
import { DevicesService } from '../devices.service';
import { ExportCsvService } from 'src/app/shared/services/export-csv.service';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  dispense_status_form: FormGroup;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private dialog: Dialog,
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private apis: ApiService,
    private ngb_modal: NgbModal,
    private local_storage: LocalStorageService,
    private device_service:DevicesService,
    private csv_export:ExportCsvService
  ) {
    this.dispense_status_form = this.fb.group({
      device_status: ['all'],
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dispense_statuses: any = [
    { value: 'all', viewValue: 'All' },
    { value: 'Activated', viewValue: 'Activated' },
    { value: 'Registered', viewValue: 'Registered' },
  ];
 

  extractedData: any[] = [];
  displayed_columns = [
    'Device ID',
    'Status',
    'Device Name',
    'Device Location',
    'Device Manager',
    'Sites',
    'Controllers',
    'Latest Backup',
    'Enterprise Version',
    'Agent Version',
    'Action',
  ];
  dataSource: any = new MatTableDataSource([]);
  data: any = [];
  status_wise_filter_data: any = [];
  table_msg:any =null;
  formControls = [
    {
      name: 'devices',
      label: 'Select Device',
      type: 'text',
      options: [
        { value: 'all', viewValue: 'All' },
        { value: 'device A', viewValue: 'Device A' },
        { value: 'Device B', viewValue: 'Device B' },
      ],
      value: 'all',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'text',
      options: [
        { value: 'all', viewValue: 'All' },
        // {value:"all", viewValue:"All"},
      ],
      value: 'all',
    },
  ];

  handleFile(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming the first sheet is the one you want to extract data from
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet data to an array of objects
      const jsonData: any = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length > 1) {
        const keys = <any>jsonData[0]; // First row contains keys
        for (let i = 1; i < jsonData.length; i++) {
          const obj: any = {};
          for (let j = 0; j < keys.length; j++) {
            obj[keys[j]] = jsonData[i][j];
          }
          this.extractedData.push(obj);
        }
        console.log(this.extractedData);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  rowClick(data: any) {
    console.log(data);

    this.router.navigate(['/devices/device-details']);
  }

  getStatusList() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');
    let request = {
      app_name: 'lfc-admin-client',
      function_name: 'Get-Status-List',
      clientid: client_code,
      session_token: session_token,
      session_user: session_user,
     
    };
    this.apis.getDeviceDataFromCloud(request).subscribe({
      next: (res) => {
        this.dispense_statuses = res.Status_List.map((status: any) => {
          return {
            value: status.status_name,
            viewValue: status.status_name,
            id:status.status_id
          };
        });
        this.dispense_statuses.unshift({
          value:'all',
          viewValue:'All'
        })
      },
      error: (err) => {},
    });
  }

  onTableDDSelection(event: any, data: any) {
   
  
  }



  onActionClick(row:any){
    let modal_ref = this.ngb_modal.open(DeviceActionsComponent, {
      centered: true,
      size:'md'
    });
    modal_ref.componentInstance.rowData = row;
    modal_ref.componentInstance.statuses = this.dispense_statuses;
  }





  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb([
      {
        name: 'Home',
        link: '/feature/home',
      },

      {
        name: 'Devices',
        link: '/feature/devices',
      },
    ]);

    this.getDevices();
    this.getStatusList();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addDevice() {
    // let modal_ref = this.ngb_modal.open(AddDeviceComponent, { centered: true });
    // modal_ref.componentInstance.device_data = this.data;
    // console.log(this.data);


    this.device_service.setSharedData({
      editMode:false,
      data:this.data,
    })

    this.router.navigate(['/feature/devices/device-actions'])



  }
  setRowData(data:any){

    this.device_service.setSharedData({
      editMode:true,
      data:data
    });

  }

  onSearch(search_value: any) {

   let  search_query = search_value.target.value;

    this.dispense_status_form.get('device_status')?.setValue('all')
    if (this.status_wise_filter_data.length > 0) {
      this.data = this.status_wise_filter_data;
    } else {
      this.status_wise_filter_data = this.data;
    }


    if(search_query!=''){

      let data = this.data.filter((record:any)=>record['Device ID'].includes(search_query));
      this.data = data;

    }
    else{
      this.status_wise_filter_data = this.data;
    }



    this.dataSource.data = this.data;
  }
  onClickSearch(data: any) {}
  
  onDispenseStatusChange(data: any) {
    let selected_status = data.target.value;
    if (this.status_wise_filter_data.length > 0) {
      this.data = this.status_wise_filter_data;
    } else {
      this.status_wise_filter_data = this.data;
    }

    if (selected_status != 'all') {
      let data = this.data.filter(
        (record: any) => record.Status == selected_status
      );
      this.data = data;
    }

    this.dataSource.data = this.data;
  }

  getDevices() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    let payload = {
      app_name: 'lfc-admin-client',
      function_name: 'Get-Device-List',
      clientid: client_code,
      session_token: session_token,
      session_user: session_user,
    };

    this.apis.getDeviceDataFromCloud(payload).subscribe({
      next: (res) => {
        this.table_msg = 'No active edge device found in your account';
        this.data = res.device_list.map((record: any) => {
          return {
            'Device ID': this.checkIfKeyExists(record.thing_name),
            Status: this.checkIfKeyExists(record.creation_status_name),
            'Device Name': this.checkIfKeyExists(record.name),
            device_name_for_dd: `${this.checkIfKeyExists(record.thing_name)}  mac_id: ${record.mac_id}`,
            'Device Location': this.checkIfKeyExists(record.location),
            'Device Manager': this.checkIfKeyExists(record.manager_name),
            Sites: this.checkIfKeyExists(record.sites),
            Controllers: this.checkIfKeyExists(record.controllers),
            'Latest Backup': this.checkIfKeyExists(record.latest_backup_path),
            'Enterprise Version': this.checkIfKeyExists(
              record.enterprise_version
            ),
            'Agent Version': this.checkIfKeyExists(record.agent_version),
            api_data:record,
            device_id: record.device_id,
          };
        });

        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.data = null;
        this.table_msg = `Error while fetching data`;

        console.log('error occurred while fetching device data', error);
      },
    });
  }

  checkIfKeyExists(key: any) {
    if (key != null && key != '') {
      return key;
    } else {
      return 'Unknown';
    }
  }

  exportToCsv(){
    
    let export_data = this.data.map((record:any)=>{
      return {
        'Device ID': record['Device ID'],
            Status: record['Status'],
            'Device Name':record['Device Name'],
            'Device Location': record['Device Location'],
            'Device Manager': record['Device Manager'],
            Sites: record['Sites'],
            Controllers: record['Controllers'],
            'Latest Backup': record['Latest Backup'],
            'Enterprise Version':record['Enterprise Version'],
            'Agent Version':record['Agent Version'],
      }
    })

    this.csv_export.setDataToExportAsCsv(export_data,'device_data.csv')
    
  
   
    
  }
}
