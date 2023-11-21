import { Component,ViewChild, EventEmitter, Input, OnInit, Output,OnChanges,SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  resultsLength:any;
 
  constructor(private router:Router){

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
   
   
  ];

  ngOnInit(): void {
    
    
    
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    
  }

  ngAfterViewInit() {
   
  }

  onClickSearch(data:any){
    console.log(data);
    
    this.searched.emit({
      data : data,
    })
  }
  onSearch(data:any){
    
    if(data.target.value != '' ){
      this.searched.emit({
        data : data.target.value,
      })
    }
    else{
      if(data.target.value == ''){
        this.searched.emit(null)
      }
    }
    
    

      
   
   
  }

  @Output() buttonClicked = new EventEmitter<{ row: any, button: string }>();
  @Output() searched = new EventEmitter();
  @Output() selectChange = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<any>();
  
  onButtonClicked(event:any,row: any, button: string) {
    this.buttonClicked.emit({ row, button });
    event.stopPropagation();
  }

  onSelectionChange(event:any,row:any){
    this.selectChange.emit({ row, value:event.targer.value });
    event.stopPropagation();
  }

  showSystemHealthDetails(row:any){
      console.log(row);
      
  }
  onRowClick(event:any,data:any){
    console.log(data);

    this.rowClick.emit(data);
    // this.router.navigate(['devices/device-details'])
    
    
  }
  
}
