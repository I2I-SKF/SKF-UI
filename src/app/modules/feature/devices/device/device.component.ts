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
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {

  dispense_status_form:FormGroup;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private dialog: Dialog,private breadcrumbService:BreadcrumbService,private fb:FormBuilder) {
    this.dispense_status_form = this.fb.group({
      device_status:['all']
    })
  }

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  dispense_statuses:any = [
    {value:'all',viewValue:'All'},
    {value:'online',viewValue:'Online'},
    {value:'offline',viewValue:'Offline'},
  ]
  table_actions = [
    {value:null,viewValue: 'Select Action'},
    {value:0,viewValue: 'Edit Device'},
    {value:1,viewValue: 'Take Backup'},
    {value:2,viewValue: 'Download Backup'},
    {value:4,viewValue:'Update Enterprise'},
    {value:5,viewValue: 'Update Agent'},
    {value:6,viewValue: 'Lock Device'},
    {value:7,viewValue: 'Delete Device'},
  ]



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
  dataSource:any;
  data  = [
    {
      'Device ID': '12AB34',
      'Device Name': 'BIOS1234567890',
      'Device Location': 'New York, USA',
      Status: 'Online',
      Pin: '1223',
      Connection: 'Online',
      'System Health': 'Normal',

      system_health_details: `
        Sys. Temp. (F) : 75,
        Network (%) : 80,
        Memory (GB) : 8,
        Storage (%) : 50,
        `,
      'Remote Access': 'Allowed',
      'Data Backup': 'mm/dd/yy',
      'Config Backup': 'mm/dd/yy',
      LFC: 1.23,
      Update: 'Yes',
      Action: this.table_actions,
    },
    {
      'Device ID': '56CD78',
      'Device Name': 'BIOS0987654321',
      'Device Location': 'Los Angeles, USA',
      Status: 'Online',
      Pin: '1223',
      Connection: 'Online',
      'System Health': 'Normal',

      system_health_details: `
          Sys. Temp. (F): 80,
          Network (%): 70,
          Memory (GB): 16,
          Storage (%): 64,
         `,
      'Remote Access': 'Restricted',
      'Data Backup': 'mm/dd/yy',
      'Config Backup': 'mm/dd/yy',
      LFC: 1.24,
      Update: 'Yes',
      Action: this.table_actions,
    },
    {
      'Device ID': '90EF12',
      'Device Name': 'BIOS1122334455',
      'Device Location': 'Chicago, USA',
      Status: 'Online',
      Pin: '1223',
      Connection: 'Online',
      'System Health': 'Normal',

      system_health_details: `
          Sys. Temp. (F): 72,
          Network (%): 60,
          Memory (GB): 8,
          Storage (%): 48,
        `,
      'Remote Access': 'Allowed',
      'Data Backup': 'mm/dd/yy',
      'Config Backup': 'mm/dd/yy',
      LFC: 1.25,
      Update: 'Yes',
      Action: this.table_actions,
    },
    {
      'Device ID': '34GH56',
      'Device Name': 'BIOS5566778899',
      'Device Location': 'Toronto, Canada',
      Status: 'Online',
      Pin: '1223',
      Connection: 'Online',
      'System Health': 'Normal',

      system_health_details: `
          Sys. Temp. (F): 70,
        Network (%): 75,
        Memory (GB): 16,
        Storage (%): 80,
         `,
      'Remote Access': 'Restricted',
      'Data Backup': 'mm/dd/yy',
      'Config Backup': 'mm/dd/yy',
      LFC: 1.26,
      Update: 'No',
      Action: [
        'Select Action',
        'Activate Device',
        'Change Device PIN',
        'Update LFC',
        'Update Services',
        'Allow Remote Access',
        'Restrict Remote Access',
        'View Logs',
        'Test Connection',
        'Modify Configurations',
        'Deactivate Device',
        'Replace Device',
        'Delete Device',
      ],
    },
    {
      'Device ID': '78IJ90',
      'Device Name': 'BIOS9988776655',
      'Device Location': 'Vancouver, Canada',
      Status: 'Online',
      Pin: '1223',
      Connection: 'Online',
      'System Health': 'Normal',

      system_health_details: `
          Sys. Temp. (F): 68,
          Network (%): 90,
          Memory (GB): 8,
          Storage (%): 40,
         `,
      'Remote Access': 'Allowed',
      'Data Backup': 'mm/dd/yy',
      'Config Backup': 'mm/dd/yy',
      LFC: 1.23,
      Update: 'Yes',
      Action: [
        'Select Action',
        'Activate Device',
        'Change Device PIN',
        'Update LFC',
        'Update Services',
        'Allow Remote Access',
        'Restrict Remote Access',
        'View Logs',
        'Test Connection',
        'Modify Configurations',
        'Deactivate Device',
        'Replace Device',
        'Delete Device',
      ],
    },
    {
      'Device ID': '12KL34',
      'Device Name': 'BIOS4433221100',
      'Device Location': 'Miami, USA',
      Status: 'Online',
      Pin: '1223',
      Connection: 'Offline',
      'System Health': 'Warning',

      system_health_details: ` 
           Sys. Temp. (F): 77,
        Network (%): 85,
        Memory (GB): 16,
        Storage (%): 64,
        `,
      'Remote Access': 'Restricted',
      'Data Backup': 'mm/dd/yy',
      'Config Backup': 'mm/dd/yy',
      LFC: 1.24,
      Update: 'Yes',
      Action: [
        'Select Action',
        'Activate Device',
        'Change Device PIN',
        'Update LFC',
        'Update Services',
        'Allow Remote Access',
        'Restrict Remote Access',
        'View Logs',
        'Test Connection',
        'Modify Configurations',
        'Deactivate Device',
        'Replace Device',
        'Delete Device',
      ],
    },
    {
      'Device ID': '56MN78',
      'Device Name': 'BIOS6677889900',
      'Device Location': 'Dallas, USA',
      Status: 'Online',
      Pin: '1223',
      Connection: 'Online',
      'System Health': 'Normal',

      system_health_details: `
          Sys. Temp. (F): 79,
          Network (%): 65,
          Memory (GB): 8,
          Storage (%): 50,
         `,
      'Remote Access': 'Allowed',
      'Data Backup': 'mm/dd/yy',
      'Config Backup': 'mm/dd/yy',
      LFC: 1.25,
      Update: 'Yes',
      Action: [
        'Select Action',
        'Activate Device',
        'Change Device PIN',
        'Update LFC',
        'Update Services',
        'Allow Remote Access',
        'Restrict Remote Access',
        'View Logs',
        'Test Connection',
        'Modify Configurations',
        'Deactivate Device',
        'Replace Device',
        'Delete Device',
      ],
    },
    {
      'Device ID': '90OP12',
      'Device Name': 'BIOS8899001122',
      'Device Location': 'Montreal, Canada',
      Status: 'Online',
      Pin: '1223',
      Connection: 'Online',
      'System Health': 'Normal',

      system_health_details: `
          Sys. Temp. (F): 73,
          Network (%): 70,
          Memory (GB): 16,
          Storage (%): 64,
        `,
      'Remote Access': 'Restricted',
      'Data Backup': 'mm/dd/yy',
      'Config Backup': 'mm/dd/yy',
      LFC: 1.26,
      Update: 'No',
      Action: [
        'Select Action',
        'Activate Device',
        'Change Device PIN',
        'Update LFC',
        'Update Services',
        'Allow Remote Access',
        'Restrict Remote Access',
        'View Logs',
        'Test Connection',
        'Modify Configurations',
        'Deactivate Device',
        'Replace Device',
        'Delete Device',
      ],
    },
    {
      'Device ID': '34QR56',
      'Device Name': 'BIOS1234432112',
      'Device Location': 'San Diego, USA',
      Status: 'Online',
      Pin: '1223',
      Connection: 'Offline',
      'System Health': 'Critical',

      system_health_details: `
          Sys. Temp. (F): 76,
          Network (%): 80,
          Memory (GB): 8,
          Storage (%): 60,
         `,
      'Remote Access': 'Allowed',
      'Data Backup': 'mm/dd/yy',
      'Config Backup': 'mm/dd/yy',
      LFC: 1.23,
      Update: 'Yes',
      Action: [
        'Select Action',
        'Activate Device',
        'Change Device PIN',
        'Update LFC',
        'Update Services',
        'Allow Remote Access',
        'Restrict Remote Access',
        'View Logs',
        'Test Connection',
        'Modify Configurations',
        'Deactivate Device',
        'Replace Device',
        'Delete Device',
      ],
    },
    {
      'Device ID': '78ST90',
      'Device Name': 'BIOS5566223344',
      'Device Location': 'Ottawa, Canada',
      Status: 'Online',
      Pin: '1223',
      Connection: 'Online',
      'System Health': 'Normal',

      system_health_details: `
          Sys. Temp. (F): 74,
          Network (%): 75,
          Memory (GB): 16,
          Storage (%): 64,
        `,
      'Remote Access': 'Restricted',
      'Data Backup': 'mm/dd/yy',
      'Config Backup': 'mm/dd/yy',
      LFC: 1.24,
      Update: 'Yes',
      Action: [
        'Select Action',
        'Activate Device',
        'Change Device PIN',
        'Update LFC',
        'Update Services',
        'Allow Remote Access',
        'Restrict Remote Access',
        'View Logs',
        'Test Connection',
        'Modify Configurations',
        'Deactivate Device',
        'Replace Device',
        'Delete Device',
      ],
    },
  ];
  formControls = [
    { name: 'devices', label: 'Select Device', type: 'text', options:[
      {value:"all", viewValue:"All"},
      {value:"device A", viewValue:"Device A"},
      {value:"Device B", viewValue:"Device B"},
    ],value:'all'  },
    { name: 'status', label: 'Status', type: 'text', options:[
      {value:"all", viewValue:"All"}
      // {value:"all", viewValue:"All"},
    ],value:'all' },
    
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

  onTableDDSelection(event:any, data:any){
    console.log(event,data);
    let selected_option  = event.target.value;

    if(selected_option == 0 || selected_option == '0'){
      this.openDialog();
    }



    
  }
  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb([
      {
        name:'Home',
        link:'/home'
      },
     
      {
        name:'Devices',
        link:'/devices'
      },
     
    ]);

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDeviceComponent, {
      data: {
        title: 'Modal Title',
      },
    });
  }

  addDevice() {
    this.openDialog();
  }

  onSearch(data:any){

  }
  onClickSearch(data:any){}
  onDispenseStatusChange(data:any){

  }
}
