import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { CommonAlertComponentComponent } from '../components/common-alert-component/common-alert-component.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class ExportCsvService {

  constructor(private ngb_modal:NgbModal) { }

  // example data  data = [
  //   { name: 'John', age: 30, city: 'New York' },
  //   { name: 'Alice', age: 25, city: 'San Francisco' },
    
  // ];


  data = [];
  
  setDataToExportAsCsv(data:any,fileName:any){
  this.data =   data;
  this.exportToCSV(fileName);

  }




  exportToCSV(fileName:any = 'data.csv') {
    const csv = Papa.unparse(this.data, { header: true });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    else{
      let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
        centered: true,
      });
      modal_ref.componentInstance.alertData = {
        alert_title: 'Error',
        alert_body:"Something went wrong.",

        alert_actions: [
          {
            button_name: 'Close',
            type: 1,
            button_value: 1,
          },
        ],
      };
    }
  }
}
