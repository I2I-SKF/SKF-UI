import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';

@Component({
  selector: 'app-dispenses',
  templateUrl: './dispenses.component.html',
  styleUrls: ['./dispenses.component.scss'],
})
export class DispensesComponent {
  constructor(
    private router: Router,
    private dialog: Dialog,
    private breadcrumbService: BreadcrumbService
  ) {}

  extractedData: any[] = [];
  displayed_columns = [
    'Site',
    'Dispense ID',
    'Job Number',
    'Part Number',
    'Authorised At',
    'Authorised by',
    'Dispense Status',
    'Completed At',
    'Fluid Name',
    'Ordered Qty.',
    'Dispensed Qty.',
    'Unit',
    'DMS',
   
  ];

  data = [
    {
      Site: 'A1',
      'Dispense ID': 'D12345',
      'Job Number': 'J001',
      'Part Number': 'P765',
      'Authorised At': '10/1/2023 8:30',
      'Authorised by': 'User1',
      'Dispense Status': 'Dispensing',
      'Fluid Name': 'Synthetic Oil',
      'Ordered Qty.': 10,
      'Dispensed Qty.': 5,
      Unit: 'gallon',
      DMS: 'Procede',
    },
    {
      Site: 'B2',
      'Dispense ID': 'D12346',
      'Job Number': 'J002',
      'Part Number': 'P766',
      'Authorised At': '10/2/2023 9:00',
      'Authorised by': 'User2',
      'Dispense Status': 'Error',
      'Fluid Name': 'Motor Oil',
      'Ordered Qty.': 15,
      'Dispensed Qty.': 0,
      Unit: 'quart',
      DMS: 'AssetWorks',
    },
    {
      Site: 'C3',
      'Dispense ID': 'D12347',
      'Job Number': 'J003',
      'Part Number': 'P767',
      'Authorised At': '10/3/2023 10:15',
      'Authorised by': 'User3',
      'Dispense Status': 'Fully Dispensed',
      'Completed At': '10/3/2023 11:15',
      'Fluid Name': 'Brake Fluid',
      'Ordered Qty.': 20,
      'Dispensed Qty.': 20,
      Unit: 'pint',
      DMS: 'CDK',
    },
    {
      Site: 'D4',
      'Dispense ID': 'D12348',
      'Job Number': 'J004',
      'Part Number': 'P768',
      'Authorised At': '10/4/2023 11:20',
      'Authorised by': 'User4',
      'Dispense Status': 'Part Dispensed',
      'Completed At': '10/4/2023 12:20',
      'Fluid Name': 'Synthetic Oil',
      'Ordered Qty.': 25,
      'Dispensed Qty.': 15,
      Unit: 'oz',
      DMS: 'DBS',
    },
    {
      Site: 'E5',
      'Dispense ID': 'D12349',
      'Job Number': 'J005',
      'Part Number': 'P769',
      'Authorised At': '10/5/2023 12:25',
      'Authorised by': 'User5',
      'Dispense Status': 'Dispensing',
      'Fluid Name': 'Motor Oil',
      'Ordered Qty.': 30,
      'Dispensed Qty.': 20,
      Unit: 'gallon',
      DMS: 'DSI',
    },
    {
      Site: 'F6',
      'Dispense ID': 'D12350',
      'Job Number': 'J006',
      'Part Number': 'P770',
      'Authorised At': '10/6/2023 13:30',
      'Authorised by': 'User6',
      'Dispense Status': 'Error',
      'Fluid Name': 'Brake Fluid',
      'Ordered Qty.': 35,
      'Dispensed Qty.': 0,
      Unit: 'quart',
      DMS: 'SKF',
    },
    {
      Site: 'G7',
      'Dispense ID': 'D12351',
      'Job Number': 'J007',
      'Part Number': 'P771',
      'Authorised At': '10/7/2023 14:35',
      'Authorised by': 'User7',
      'Dispense Status': 'Fully Dispensed',
      'Completed At': '10/7/2023 15:35',
      'Fluid Name': 'Synthetic Oil',
      'Ordered Qty.': 40,
      'Dispensed Qty.': 40,
      Unit: 'pint',
      DMS: 'TMW',
    },
    {
      Site: 'H8',
      'Dispense ID': 'D12352',
      'Job Number': 'J008',
      'Part Number': 'P772',
      'Authorised At': '10/7/2023 14:35',
      'Authorised by': 'User8',
      'Dispense Status': 'Part Dispensed',
      'Completed At': '10/9/2023 16:45',
      'Fluid Name': 'Motor Oil',
      'Ordered Qty.': 45,
      'Dispensed Qty.': 30,
      Unit: 'oz',
      DMS: 'Karmak',
    },
    {
      Site: 'I9',
      'Dispense ID': 'D12353',
      'Job Number': 'J009',
      'Part Number': 'P773',
      'Authorised At':'10/8/2023 15:40',
      'Authorised by': 'User9',
      'Dispense Status': 'Dispensing',
      'Fluid Name': 'Brake Fluid',
      'Ordered Qty.': 50,
      'Dispensed Qty.': 25,
      Unit: 'gallon',
      DMS: 'Procede',
    },
    {
      Site: 'J10',
      'Dispense ID': 'D12354',
      'Job Number': 'J010',
      'Part Number': 'P774',
      'Authorised At': '10/10/2023 17:50',
      'Authorised by': 'User10',
      'Dispense Status': 'Error',
      'Fluid Name': 'Synthetic Oil',
      'Ordered Qty.': 55,
      'Dispensed Qty.': 0,
      Unit: 'quart',
      DMS: 'AssetWorks',
    },
  ];
  formControls = [
    {
      name: 'dispenses',
      label: 'Select Dispense',
      type: 'text',
      options: [
        { value: 'all', viewValue: 'All' },
        { value: 'dispense A', viewValue: 'dispense A' },
        { value: 'dispense B', viewValue: 'dispense B' },
      ],
      value: 'all',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'text',
      options: [
        {value: 'all', viewValue: 'All' },
        {value:"Active", viewValue:"Active"},
        {value:"Cancelled", viewValue:"Cancelled"},
        {value:"Paused", viewValue:"Paused"},
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
  }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(AddDeviceComponent, {
  //     data: {
  //       title: 'Modal Title',
  //     },
  //   });
  // }

  addDevice() {
    // this.openDialog();
  }
}
