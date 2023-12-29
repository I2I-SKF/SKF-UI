import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ExportCsvService } from 'src/app/shared/services/export-csv.service';

@Component({
  selector: 'app-dispenses',
  templateUrl: './dispenses.component.html',
  styleUrls: ['./dispenses.component.scss'],
})
export class DispensesComponent {
  dispensesForm: any;
  constructor(
    private router: Router,
    private dialog: Dialog,
    private breadcrumbService: BreadcrumbService,
    private fb: FormBuilder,
    private api: ApiService,
    private local_storage:LocalStorageService,
    private csv_export: ExportCsvService
  ) {}

  devices_data:any[] = [
    
  ];
  sites_data = [{ value: 'all', viewValue: 'All' }];
  dispense_statuses = [
    { value: 'all', viewValue: 'All' },

    { value: 0, viewValue: 'Active' },
    { value: 1, viewValue: 'Ending' },
    { value: 2, viewValue: 'Complete' },
    { value: 3, viewValue: 'Error' },
    { value: 4, viewValue: 'Cancelled' },
  ];
  dispense_data: any = [];
  last_sync_time: any = null;
  extractedData: any[] = [];
  backup_for_filter: any = [];
  dispense_status_form: any = [];

  transaction_data = [
    {
      value: 10,
      viewValue: 10,
    },
    {
      value: 50,
      viewValue: 50,
    },
    {
      value: 100,
      viewValue: 100,
    },
  ];
  displayed_columns = [
    'Device',
    'Site Name',
    'Transaction No',
    'Start Time',
    'Dispense Status',
    'Controller Response',
    'Fluid Name',
    'Initiated By',
    'Ordered',
    'Dispensed',
    'End Time',
  ];

  data = [];
  formControls = [
    {
      name: 'dispenses',
      label: 'Select Device',
      type: 'text',
      options: [
        { value: 'all', viewValue: 'All' },
        { viewValue: 'Device 1, Pune', value: '11231223' },
      ],
      value: 'all',
    },
    {
      name: 'Sites',
      label: 'Site',
      type: 'text',
      options: [
        { value: 'all', viewValue: 'All' },
        { value: 'Site 1', viewValue: 'Site 1' },
      ],
      value: 'all',
    },
    {
      name: 'Dispense',
      label: 'Status',
      type: 'text',
      options: [
        { value: 'all', viewValue: 'All' },
        { value: 0, viewValue: 'Active' },
        { value: 1, viewValue: 'Ending' },
        { value: 2, viewValue: 'Complete' },
        { value: 3, viewValue: 'Error' },
        { value: 4, viewValue: 'Cancelled' },
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

    // this.router.navigate(['/devices/device-details']);
  }
  searched: any;
  onSearch(data: any) {
    if (data.target.value != '') {
      this.catchSearchEvents(data.target.value);
    } else {
      if (data.target.value == '') {
        this.catchSearchEvents(null);
        this.dispense_status_form.get('dispense_status')?.setValue('all');
      }
    }
  }
  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb([
      {
        name: 'Home',
        link: '/feature/home',
      },
      {
        name: 'Dispenses',
        link: '',
      },
    ]);

    this.dispensesForm = this.fb.group({
      devices: [this.devices_data[0]?.value],
      dispense_form_radio: ['last_transaction'],
      start_date: [{value:'',disabled:true}],
      end_date: [{value:'',disabled:true}],
      // dispense_status: ['all'],
      transactions: [10],
    });
    this.dispense_status_form = this.fb.group({
      devices: [this.devices_data[0]?.value],
      sites: ['all'],
      start_date: [],
      end_date: [],
      dispense_status: ['all'],
    });

    this.getDevices();
   
  }

  date_min_max = {
    start_date_min: '2023-11-20',
    start_date_max: '',
    end_date_min: '',
    end_date_max: '',
  };

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }
  onTransactionChange(data: any) {}
  addDevice() {
    // this.openDialog();
  }

  onFilterGroupChange(data:any){
      let selected_option  = data.target.value;
      this.dispensesForm.get('transactions').setValue("");
      this.dispensesForm.get('start_date').setValue("");
      this.dispensesForm.get('end_date').setValue("");
      this.dispensesForm.get('transactions').enable();
      this.dispensesForm.get('start_date').enable();
      this.dispensesForm.get('end_date').enable();
      
      if(selected_option == 'dates'){
        this.dispensesForm.get('transactions').disable();
        this.dispensesForm.get('transactions').setValue("");
      }
      else{
        this.dispensesForm.get('start_date').disable();
        this.dispensesForm.get('end_date').disable();
      }


  }

  startDateChange(data: any) {}

  endDateChange(data: any) {}

  searchFilterBackup: any = [];

  catchSearchEvents(data: any) {
    this.dispense_status_form.get('dispense_status').setValue('all');

    this.onDispenseStatusChange({ target: { value: 'all' } });

    if (this.searchFilterBackup.length > 0) {
      this.dispense_data = this.searchFilterBackup;
    } else {
      this.searchFilterBackup = this.dispense_data;
    }

    if (data) {
      let filtered_data = this.dispense_data.filter((record: any) => {
        return record['Transaction No'] == parseInt(data);
      });
      this.dispense_data = filtered_data;

      console.log(filtered_data);
    } else {
      this.dispense_data = this.searchFilterBackup;
    }
  }

  onSiteChange(data: any) {
    let site_id = data.target.value;
    this.dispense_data =
      site_id == 'all'
        ? this.createDispenseLogForAll()
        : this.createDispenseLog(site_id);
    console.log(this.dispense_data);
  }

  createDispenseLog(site_id: any) {
    let data: any[] = this.site_wise_dispneses[site_id];
    if (data.length != 0) {
      return data.map((record: any) => {
        return {
          Device: this.checkIfKeyExists(record.deviceid),
          'Site Name': this.checkIfKeyExists(record.dmsTypeDescription),
          'Transaction No': this.checkIfKeyExists(record.transactionNumber),
          'Start Time': this.checkIfKeyExists(record.dispenseStartedLocal),
          'Dispense Status': this.checkIfKeyExists(record.statusDescription),
          'Controller Response': this.checkIfKeyExists(
            record.hardwareStatusCodeDescription
          ),
          'Fluid Name': this.checkIfKeyExists(record.tankFluidDescription),
          'Initiated By': this.checkIfKeyExists(record.initiatedBy),
          Ordered: `${this.checkIfKeyExists(
            record.quantityRequested
          )} (${this.checkIfKeyExists(record.volumeUnitAbbrev)})`,
          Dispensed: `${this.checkIfKeyExists(
            record.quantityDispensed
          )} (${this.checkIfKeyExists(record.volumeUnitAbbrev)})`,
          'End Time': this.checkIfKeyExists(record.dispenseStartedLocal),
          dispense_status_id: `${record.statusId}`,
        };
      });
    } else {
      return [];
    }
  }

  createDispenseLogForAll() {
    this.dispense_status_form.get('sites').setValue('all');
    let dispense_data: any = [];
    this.sites_data.forEach((site: any) => {
      if (site.value != 'all') {
        this.site_wise_dispneses[site.value].forEach((record: any) => {
          this.dispense_statuses.push();

          dispense_data.push({
             Device: this.checkIfKeyExists(record.deviceid),
            'Site Name': this.checkIfKeyExists(record.dmsTypeDescription),
            'Transaction No': this.checkIfKeyExists(record.transactionNumber),
            'Start Time': this.checkIfKeyExists(record.dispenseStartedLocal),

            'Dispense Status': this.checkIfKeyExists(record.statusDescription),
            'Controller Response': this.checkIfKeyExists(
              record.hardwareStatusCodeDescription
            ),
            'Fluid Name': this.checkIfKeyExists(record.tankFluidDescription),
            'Initiated By': this.checkIfKeyExists(record.initiatedBy),
            Ordered: `${this.checkIfKeyExists(
              record.quantityRequested
            )} (${this.checkIfKeyExists(record.volumeUnitAbbrev)})`,
            Dispensed: `${this.checkIfKeyExists(
              record.quantityDispensed
            )} (${this.checkIfKeyExists(record.volumeUnitAbbrev)})`,
            'End Time': this.checkIfKeyExists(record.dispenseStartedLocal),

            dispense_status_id: `${record.statusId}`,
          });
        });
      }
    });

    return dispense_data;
  }

  checkIfKeyExists(key: any) {
    if (key != null && key != '') {
      return key;
    } else {
      return 'Unknown';
    }
  }

  site_wise_dispneses: any = {};

  onDeviceChange(data: any) {
    let selected_device = data.target.value;
    let today = new Date();

    // this.dispensesForm.get('start_date').setValue(this.formatDate(today));
    // this.dispensesForm.get('end_date').setValue(this.formatDate(today));
    this.getCloudData();
  }
  resetEverything() {
    this.site_wise_dispneses = [];
    this.dispense_data = [];
    this.sites_data = [{ value: 'all', viewValue: 'All' }];
  }

  onDispenseStatusChange(data: any) {
    console.log(data);

    let selected_dispense_status: any = data.target.value;
    console.log('selected option dispense ', selected_dispense_status);

    if (this.backup_for_filter.length != 0) {
      this.dispense_data = this.backup_for_filter;
    } else {
      this.backup_for_filter = this.dispense_data;
    }

    if (selected_dispense_status == 'all') {
      this.dispense_data = this.backup_for_filter;
    } else {
      let filterd_data = this.dispense_data.filter((dispense: any) => {
        console.log(
          dispense['dispense_status_id'] + ' ' + selected_dispense_status
        );

        if (dispense['dispense_status_id'] == selected_dispense_status) {
          return true;
        } else {
          return false;
        }
      });

      this.dispense_data = filterd_data;
    }
  }

  convertToUTCDate() {
    return new Date().toISOString().split('T')[0];
  }

  getCloudData() {

    this.resetEverything();

    let client_code = this.local_storage.getFromLocalStorage('client_code');
   

    let data: any = {
      app_name: 'lfc-admin-client',
      clientid:client_code ,
      thing_name: this.dispensesForm.get('devices').value,
      from_time: this.dispensesForm.get('start_date').value ? this.dispensesForm.get('start_date').value + " 00:00:00": null,
      to_time: this.dispensesForm.get('end_date').value ?  this.dispensesForm.get('end_date').value + " 11:59:59" : null,
      limit: parseInt(this.dispensesForm.get('transactions').value),
    };

    if(this.dispensesForm.get('dispense_form_radio').value == 'last_transaction'){
      delete data.from_time;
      delete data.to_time;
     }
     else{
     delete data.limit;
     }
    // if (
    //   this.dispensesForm.get('end_date').value == null ||
    //   this.dispensesForm.get('start_date').value == null
    // ) {
    //   data = {
    //     device_id: this.dispensesForm.get('devices').value,
    //   };
    // }

    // let date_check = this.formatDate(new Date());

    // if (date_check == data.from_time && date_check == data.to_time) {
    //   data = {
    //     device_id: this.dispensesForm.get('devices').value,
    //     from_time: this.convertToUTCDate(),
    //     to_time: new Date().toISOString(),
    //   };
    // }

    this.api.getDispenseData(data).subscribe({
      next: (res) => {
        console.log(res.body);

        this.dispense_data = res.body.forEach((dispense_record: any) => {
          let updated_record = { ...dispense_record };

          if (this.site_wise_dispneses[dispense_record.siteId]) {
            this.site_wise_dispneses[dispense_record.siteId].push(
              updated_record
            );
          } else {
            this.site_wise_dispneses[dispense_record.siteId] = [updated_record];
            this.sites_data.push({
              value: dispense_record.siteId,
              viewValue: dispense_record.dmsTypeDescription,
            });
          }
        });

        console.log(this.site_wise_dispneses, this.sites_data);

        this.onSiteChange({ target: { value: 'all' } });

        this.last_sync_time = new DatePipe('en-US').transform(
          res.utctime,
          'yyyy-MM-dd HH:mm'
        );
      },
      error: (err) => {
        console.error('error occurred while reading from cloud', err);
      },
    });
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

    this.api.getDeviceDataFromCloud(payload).subscribe({
      next: (res) => {
       
        this.devices_data = res.device_list.map((record: any) => {
          return {
            api_data:record,
            device_id: record.device_id,
            value:this.checkIfKeyExists(record.thing_name),
            viewValue: this.checkIfKeyExists(record.name),
            thing_name:this.checkIfKeyExists(record.thing_name) 
          };
        });

        if(this.devices_data.length >0){
          this.dispensesForm.get('devices').setValue(this.devices_data[0].value)
          this.getCloudData();
        }
       
      },
      error: (error) => {
        console.log('error occurred while fetching device data', error);
      },
    });
  }


  exportToCsv(){
    console.log(this.data);
    
    let export_data = this.dispense_data.map((record:any)=>{
      return {
        'Device':record['Device'],
        'Site Name':record['Site Name'],
        'Transaction No':record['Transaction No'],
        'Start Time':record['Start Time'],
        'Dispense Status':record['Dispense Status'],
        'Controller Response':record['Controller Response'],
        'Fluid Name':record['Fluid Name'],
        'Initiated By':record['Initiated By'],
        'Ordered':record['Ordered'],
        'Dispensed':record['Dispensed'],
        'End Time':record['End Time'],
       }
    })

    this.csv_export.setDataToExportAsCsv(export_data,'dispense_data.csv')

  }





}
