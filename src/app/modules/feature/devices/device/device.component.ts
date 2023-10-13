import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  constructor(private router: Router, private dialog: Dialog,private breadcrumbService:BreadcrumbService) {}

  extractedData: any[] = [];
  displayed_columns = [
    'Device ID',
    'Hardware ID',
    'Location',
    'Dispenser Sites',
    'Status',
    'Pin',
    'Connection',
    'Avg.uptime (%/month)',
    'System Health',
    // "Sys. Temp. (F)",
    // "Network (%)",
    // "Memory (GB)",
    // "Storage (%)",
    'Remote Access',
    'Data Backup',
    'Config Backup',
    'LFC',
    'Update',
    'Action',
  ];

  data = [
    {
      'Device ID': '12AB34',
      'Hardware ID': 'BIOS1234567890',
      Location: 'New York, USA',
      Status: 'Activated',
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
      'Device ID': '56CD78',
      'Hardware ID': 'BIOS0987654321',
      Location: 'Los Angeles, USA',
      Status: 'Activated',
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
      'Device ID': '90EF12',
      'Hardware ID': 'BIOS1122334455',
      Location: 'Chicago, USA',
      Status: 'Activated',
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
      'Device ID': '34GH56',
      'Hardware ID': 'BIOS5566778899',
      Location: 'Toronto, Canada',
      Status: 'Activated',
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
      'Hardware ID': 'BIOS9988776655',
      Location: 'Vancouver, Canada',
      Status: 'Activated',
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
      'Hardware ID': 'BIOS4433221100',
      Location: 'Miami, USA',
      Status: 'Activated',
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
      'Hardware ID': 'BIOS6677889900',
      Location: 'Dallas, USA',
      Status: 'Activated',
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
      'Hardware ID': 'BIOS8899001122',
      Location: 'Montreal, Canada',
      Status: 'Activated',
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
      'Hardware ID': 'BIOS1234432112',
      Location: 'San Diego, USA',
      Status: 'Activated',
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
      'Hardware ID': 'BIOS5566223344',
      Location: 'Ottawa, Canada',
      Status: 'Activated',
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
}
