import { Component,ViewChild, EventEmitter, Input, OnInit, Output,OnChanges,SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements OnInit, OnChanges {

  dataSource: any;
  resultsLength:any;
  dispense_status_form :FormGroup;
  dispense_statuses:any = [
    { value: 'all', viewValue: 'All' },
   
        { value: 0, viewValue: 'Active' },
        { value: 1, viewValue: 'Ending' },
        { value: 2, viewValue: 'Complete' },
        { value: 3, viewValue: 'Error' },
        { value: 4, viewValue: 'Cancelled' },
    
  ];
 
  constructor(private router:Router,private fb:FormBuilder){

    this.dispense_status_form = this.fb.group({
      dispense_status : ['all']
    })


  }
  @ViewChild(MatSort) sort!: MatSort;
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
  @Input() isSearchVisible = false ;
  @Input() isfilterVisible = false ;
  @Input() isDispenseData = false ;



  ngOnInit(): void {
    
    
    
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);

    this.dataSource = new MatTableDataSource(this.data);

    this.dataSource.sortingDataAccessor = (item:any, property:any) => {
      switch (property) {
        case 'Start Time': return new Date(item['Start Time']);
        case 'End Time': return new Date(item['End Time']);
        default: return item[property];
      }
    };
    
    this.dataSource.paginator = this.paginator;
    this.sort.sort(({ id: 'Transaction No', start: 'desc'}) as MatSortable);
    this.dataSource.sort = this.sort;
    
   
    




  

    
    
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
        this.dispense_status_form.get('dispense_status')?.setValue('all'); 
      }
    }

  }

  @Output() buttonClicked = new EventEmitter<{ row: any, button: string }>();
  @Output() searched = new EventEmitter();
  @Output() statusChange = new EventEmitter();
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
  onDispenseStatusChange(data:any){
    this.statusChange.emit(data);
  }
  
}
