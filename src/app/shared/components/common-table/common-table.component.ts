import { Component,ViewChild, EventEmitter, Input, OnInit, Output,OnChanges,SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  resultsLength:any;
 
  constructor(private dialog: MatDialog){

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() actions = {type:'btn',data : ['edit','buttons']};

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
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    
  }

  @Output() buttonClicked = new EventEmitter<{ row: any, button: string }>();
  @Output() selectChange = new EventEmitter<any>();
  
  onButtonClicked(row: any, button: string) {
    this.buttonClicked.emit({ row, button });
  }

  onSelectionChange(event:any,row:any){
    this.selectChange.emit({ row, value:event.targer.value });
  }

  showSystemHealthDetails(row:any){
      console.log(row);
      
  }
  
}
