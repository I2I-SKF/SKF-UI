import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent {
  constructor(private router: Router, private dialog: Dialog) {}

  extractedData: any[] = [];
  displayed_columns = [
    'Device ID',
    'Location',
    'Site Name',
    'Connection',
    'Site Manager',
    'Contact Number',
    'Dispenses Today',
    'Active Dispenses',
    'Dispense Errors',
    'Cotrollers',
    'Controllers Offline',
    'Tanks',
    'Hoses',
    'DMS',
    'Action',
  ];

  data = [
    {
      'Device ID': '12AB34',
      Location: 'New York, USA',
      'Site Name': 'Site One',
      Connection: 'Online',
      'Site Manager': 'Peter M.',
      'Contact Number': '1 314 555 666',
      'Dispenses Today': 48,
      'Active Dispenses': 6,
      'Dispense Errors': 0,
      Cotrollers: 3,
      'Controllers Offline': 0,
      Tanks: 9,
      Hoses: 18,
      DMS: 'DMS-1',
      Action: [
        'Select Action',
        'Edit Site',
        'Refresh Data',
        'Ping Controllers',
        'Export Site Data',
      ],
    },
    {
      'Device ID': '12AB34',
      Location: 'New York, USA',
      'Site Name': 'Site Two',
      Connection: 'Online',
      'Site Manager': 'Peter M.',
      'Contact Number': '1 314 555 666',
      'Dispenses Today': 14,
      'Active Dispenses': 3,
      'Dispense Errors': 0,
      Cotrollers: 2,
      'Controllers Offline': 0,
      Tanks: 4,
      Hoses: 8,
      DMS: 'DMS-1',
      Action: [
        'Select Action',
        'Edit Site',
        'Refresh Data',
        'Ping Controllers',
        'Export Site Data',
      ],
    },
    {
      'Device ID': '12AB34',
      Location: 'New York, USA',
      'Site Name': 'Site Three',
      Connection: 'Online',
      'Site Manager': 'Peter M.',
      'Contact Number': '1 314 555 666',
      'Dispenses Today': 12,
      'Active Dispenses': 0,
      'Dispense Errors': 12,
      Cotrollers: 1,
      'Controllers Offline': 1,
      Tanks: 3,
      Hoses: 6,
      DMS: 'DMS-1',
      Action: [
        'Select Action',
        'Edit Site',
        'Refresh Data',
        'Ping Controllers',
        'Export Site Data',
      ],
    },
    {
      'Device ID': '12AB34',
      Location: 'New York, USA',
      'Site Name': 'Site Four',
      Connection: 'Online',
      'Site Manager': 'Peter M.',
      'Contact Number': '1 314 555 666',
      'Dispenses Today': 160,
      'Active Dispenses': 24,
      'Dispense Errors': 1,
      Cotrollers: 6,
      'Controllers Offline': 0,
      Tanks: 6,
      Hoses: 36,
      DMS: 'DMS-1',
      Action: [
        'Select Action',
        'Edit Site',
        'Refresh Data',
        'Ping Controllers',
        'Export Site Data',
      ],
    },
    {
      'Device ID': '56MN78',
      Location: 'Dallas, USA',
      'Site Name': 'Site Alpha',
      Connection: 'Online',
      'Site Manager': 'Shelly J.',
      'Contact Number': '1 686 222 333',
      'Dispenses Today': 26,
      'Active Dispenses': 4,
      'Dispense Errors': 0,
      Cotrollers: 2,
      'Controllers Offline': 0,
      Tanks: 5,
      Hoses: 10,
      DMS: 'DMS-2',
      Action: [
        'Select Action',
        'Edit Site',
        'Refresh Data',
        'Ping Controllers',
        'Export Site Data',
      ],
    },
    {
      'Device ID': '56MN78',
      Location: 'Dallas, USA',
      'Site Name': 'Site Beta',
      Connection: 'Online',
      'Site Manager': 'Shelly J.',
      'Contact Number': '1 686 222 333',
      'Dispenses Today': 22,
      'Active Dispenses': 6,
      'Dispense Errors': 0,
      Cotrollers: 2,
      'Controllers Offline': 0,
      Tanks: 5,
      Hoses: 10,
      DMS: 'DMS-2',
      Action: [
        'Select Action',
        'Edit Site',
        'Refresh Data',
        'Ping Controllers',
        'Export Site Data',
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
      const sheetName = workbook.SheetNames[2];
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

    this.router.navigate(['/sites/site-details']);
  }

  ngOnInit(): void {}

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(, {
  //     data: {
  //       title: 'Modal Title',
  //     },
  //   });
  // }

  addDevice() {
    // this.openDialog();
  }
}
