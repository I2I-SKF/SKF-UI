import { Component,ViewChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  resultsLength:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() buttons = ['Edit', 'Delete'];

  @Input() columns: string[] = [
    'Site Name',
    'Stations',
    'Hoes',
    'Tanks',
    'Low Warnings',
    'Users',
    'Customers',
    'Active Disp.',
    'Complete Disp.',
    'Failed Disp.',
    'Billed Disp.',
    'Actions'
    
  ];
  @Input() data: any = [
    {
    'Site Name':'Lubock',
    'Stations':4,
    'Hoes':16,
    'Tanks':2,
    'Low Warnings':0,
    'Users':8,
    'Customers':150,
    'Active Disp.':6,
    'Complete Disp.':42,
    'Failed Disp.':3,
    'Billed Disp.':876.50,
    },
    {
    'Site Name':'La Jolla',
    'Stations':4,
    'Hoes':16,
    'Tanks':2,
    'Low Warnings':0,
    'Users':8,
    'Customers':150,
    'Active Disp.':6,
    'Complete Disp.':42,
    'Failed Disp.':3,
    'Billed Disp.':876.50,
    },
    {
    'Site Name':'Franklin',
    'Stations':4,
    'Hoes':16,
    'Tanks':2,
    'Low Warnings':0,
    'Users':8,
    'Customers':150,
    'Active Disp.':6,
    'Complete Disp.':42,
    'Failed Disp.':3,
    'Billed Disp.':876.50,
    },
    {
    'Site Name':'Lube Truck 1',
    'Stations':4,
    'Hoes':16,
    'Tanks':2,
    'Low Warnings':0,
    'Users':8,
    'Customers':150,
    'Active Disp.':6,
    'Complete Disp.':42,
    'Failed Disp.':3,
    'Billed Disp.':876.50,
    
    
    },
   
  ];

  ngOnInit(): void {
    this.dataSource = this.data;
  }

  @Output() buttonClicked = new EventEmitter<{ row: any, button: string }>();
  
  onButtonClicked(row: any, button: string) {
    this.buttonClicked.emit({ row, button });
  }
}
