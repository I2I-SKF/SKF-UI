import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { DatePipe } from '@angular/common';

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
    private api: ApiService
  ) {}

  devices_data = [
    { viewValue: 'Device 1, Pune', value: '00001UZ1XYETP' },
    { viewValue: 'Device 2, St. Louis', value: '00001S81KOXLA' },
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
  backup_for_filter:any = [];

  transaction_data = [
    {
      value:10,viewValue:10
    },
    {
      value:50,viewValue:50
    },
    {
      value:100,viewValue:100
    },
  ]
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

  data = [
    {
      Device: 'Device 1, Pune',
      'Site Name': 'Site A',
      'Transaction No': 171,
      'Start Time': '11/17/2023 3:32:28 PM',
      'Dispense Status': 'Complete',
      'Controller Response': 'Successful',
      'Fluid Name': 'Mobile 1',
      'Initiated By': 'System Administrator',
      Ordered: '1 Quarts',
      Dispensed: '1 Quarts',
      'End Time': 1,
    },
    {
      Device: 'Device 1, Pune',
      'Site Name': 'Site A',
      'Transaction No': 171,
      'Start Time': '11/17/2023 3:32:28 PM',
      'Dispense Status': 'Complete',
      'Controller Response': 'Successful',
      'Fluid Name': 'Mobile 1',
      'Initiated By': 'System Administrator',
      Ordered: '1 Quarts',
      Dispensed: '1 Quarts',
      'End Time': 1,
    },
    {
      Device: 'Device 1, Pune',
      'Site Name': 'Site A',
      'Transaction No': 171,
      'Start Time': '11/17/2023 3:32:28 PM',
      'Dispense Status': 'Complete',
      'Controller Response': 'Successful',
      'Fluid Name': 'Mobile 1',
      'Initiated By': 'System Administrator',
      Ordered: '1 Quarts',
      Dispensed: '1 Quarts',
      'End Time': 1,
    },
  ];
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

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb([
      {
        name: 'Home',
        link: '/home',
      },
      {
        name: 'Dispenses',
        link: '',
      },
    ]);

    let date = new Date();
    this.dispensesForm = this.fb.group({
      devices: [this.devices_data[0].value],
      sites: ['all'],
      start_date: [],
      end_date: [],
      dispense_status: ['all'],
      transactions: [10],
      
    });

    this.getCloudData(true);
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
  onTransactionChange(data:any){

  }
  addDevice() {
    // this.openDialog();
  }
  startDateChange(data: any) {}

  endDateChange(data: any) {}


  searchFilterBackup:any = [];

  catchSearchEvents(data:any){

    this.dispensesForm.get('dispense_status').setValue('all')

    this.onDispenseStatusChange({target:{value:'all'}});


    if(this.searchFilterBackup.length>0){
      this.dispense_data =  this.searchFilterBackup 
    }
    else{
      this.searchFilterBackup = this.dispense_data;
    }

    if(data?.data){
      let filtered_data = this.dispense_data.filter((record:any)=>{
        return record['Transaction No'] == parseInt(data.data)
      });
      this.dispense_data = filtered_data;

      console.log(filtered_data);
      
    }
    else{
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
          'Start Time': this.checkIfKeyExists(record.dispenseStartedLocal)  ,
          'Dispense Status': this.checkIfKeyExists(record.statusDescription),
          'Controller Response': this.checkIfKeyExists(
            record.hardwareStatusCodeDescription
          ),
          'Fluid Name': this.checkIfKeyExists(record.tankFluidDescription),
          'Initiated By': this.checkIfKeyExists(record.initiatedBy),
          Ordered: this.checkIfKeyExists(record.quantityRequested),
          Dispensed: this.checkIfKeyExists(record.quantityDispensed),
          'End Time': this.checkIfKeyExists(record.dispenseStartedLocal)  ,
          'dispense_status_id':`${record.statusId}`
        };
      });
    } else {
      return [];
    }
  }

  createDispenseLogForAll() {
    this.dispensesForm.get('sites').setValue('all');
    let dispense_data: any = [];
    this.sites_data.forEach((site: any) => {
      if (site.value != 'all') {
        this.site_wise_dispneses[site.value].forEach((record: any) => {

          this.dispense_statuses.push()

          dispense_data.push({
            Device: this.checkIfKeyExists(record.deviceid),
            'Site Name': this.checkIfKeyExists(record.dmsTypeDescription),
            'Transaction No': this.checkIfKeyExists(record.transactionNumber),
            'Start Time':  this.checkIfKeyExists(record.dispenseStartedLocal) ,

            'Dispense Status': this.checkIfKeyExists(record.statusDescription),
            'Controller Response': this.checkIfKeyExists(
              record.hardwareStatusCodeDescription
            ),
            'Fluid Name': this.checkIfKeyExists(record.tankFluidDescription),
            'Initiated By': this.checkIfKeyExists(record.initiatedBy),
            Ordered: this.checkIfKeyExists(record.quantityRequested),
            Dispensed: this.checkIfKeyExists(record.quantityDispensed),
            'End Time': this.checkIfKeyExists(record.dispenseStartedLocal) ,

            'dispense_status_id':`${record.statusId}`

            
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
    this.getCloudData(true);
  }
  resetEverything() {
    this.site_wise_dispneses = [];
    this.dispense_data = [];
    this.sites_data = [{ value: 'all', viewValue: 'All' }];
  }

  onDispenseStatusChange(data:any){


    console.log(data);
    
    let selected_dispense_status:any = data.target.value;
    console.log('selected option dispense ',selected_dispense_status);
  
    
    if(this.backup_for_filter.length != 0){

      this.dispense_data = this.backup_for_filter;


    }
    else{
      this.backup_for_filter = this.dispense_data;
    }


    if(selected_dispense_status =='all'){
      this.dispense_data = this.backup_for_filter;
    }
    else{
      let filterd_data = this.dispense_data.filter((dispense:any)=>{
        console.log(dispense['dispense_status_id'] + " " + selected_dispense_status);
        
        if(dispense['dispense_status_id'] == selected_dispense_status){
          return true;
        }
        else{
          return false; 
        }
      });
  
      this.dispense_data = filterd_data;
    }

   



  }

  convertToUTCDate(){
    return new Date().toISOString().split("T")[0];
  }
  

  getCloudData(isOnload=false) {
    this.resetEverything();

    console.log('inside cloud fetch');

    let data:any = {
      device_id: this.dispensesForm.get('devices').value,
      from_time: this.dispensesForm.get('start_date').value,
      to_time: this.dispensesForm.get('end_date').value,
    };
    if(this.dispensesForm.get('end_date').value == null || this.dispensesForm.get('start_date').value == null  ){
      data = {
        device_id: this.dispensesForm.get('devices').value,
      }
    }

    let date_check= this.formatDate(new Date());

    // if(isOnload || (date_check == data.from_time && date_check == data.to_time)){
    //    data = {
    //     device_id: this.dispensesForm.get('devices').value,
    //     from_time: this.convertToUTCDate(),
    //     to_time: new Date().toISOString(),
    //   };
    // }

    this.api.getDataFromCloud(data).subscribe({
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

       

       
        this.last_sync_time = new DatePipe('en-US').transform(res.utctime, 'yyyy-MM-dd HH:mm');
        
      },
      error: (err) => {
        console.error('error occurred while reading from cloud', err);
      },
    });
  }







}
