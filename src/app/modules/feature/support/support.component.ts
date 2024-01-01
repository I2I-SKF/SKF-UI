import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { RequestSupportComponent } from './request-support/request-support.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommentHistoryComponent } from './comment-history/comment-history.component';
import { ExportCsvService } from 'src/app/shared/services/export-csv.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  displayed_columns: any[] = [
    'Ticket ID',
    'Status',

    'Open Days',

    'Device ID',
    'Request Details',
    'Remote Access',
    'Resolution',
    'Date',
    'Comment History',
    // 'Action',
  ];
  request_data = [
    {
      value: '3',
      viewValue: '3',
    },
    {
      value: '6',
      viewValue: '6',
    },
    {
      value: '9',
      viewValue: '9',
    },
  ];

  ticketStatuses: any = [];
  table_data: any[] = [];

  dispensesForm: any;
  devices_data: any = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private ngbmodal: NgbModal,
    private fb: FormBuilder,
    private apis: ApiService,
    private local_storage: LocalStorageService,
    private csv_export:ExportCsvService
  ) {}
  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb([
      {
        name: 'Home',
        link: '/feature/home',
      },

      {
        name: 'Support',
        link: '',
      },
    ]);
    let date = new Date();
    this.dispensesForm = this.fb.group({
      devices: [''],
      start_date: [{ value: '', disabled: true }],
      end_date: [{ value: '', disabled: true }],
      last_request: ['3'],
      support_filter_toggle: ['last_request'],
    });

    this.getTicketStatusList();
    this.getDevices();
  }

  rowClick(row: any) {
    console.log(row);
  }
  requestSupport() {
    let modal_ref = this.ngbmodal.open(RequestSupportComponent, {
      centered: true,
    });

    modal_ref.result.then((res) => {
      this.getTicketStatusList();
    });
  }

  onFilterGroupChange(data: any) {
    let selected_option = data.target.value;
    this.dispensesForm.get('last_request').setValue('');
    this.dispensesForm.get('start_date').setValue('');
    this.dispensesForm.get('end_date').setValue('');
    this.dispensesForm.get('last_request').enable();
    this.dispensesForm.get('start_date').enable();
    this.dispensesForm.get('end_date').enable();

    if (selected_option == 'dates') {
      this.dispensesForm.get('last_request').disable();
      this.dispensesForm.get('last_request').setValue('');
    } else {
      this.dispensesForm.get('last_request').setValue('3');
      this.dispensesForm.get('start_date').disable();
      this.dispensesForm.get('end_date').disable();
    }
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }

  onDeviceChange(event: any) {}
  startDateChange(event: any) {
    this.dispensesForm.get('end_date').setValue('');
  }
  endDateChange(event: any) {}

  getDevices() {
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');

    let payload = {
      app_name: 'lfc-admin-client',
      function_name: 'Get-Device-List',
      clientid: client_code,
      session_token: session_token,
      session_user: session_user,
    };

    this.apis.getDeviceDataFromCloud(payload).subscribe({
      next: (res) => {
        this.devices_data = res.device_list.map((record: any) => {
          return {
            api_data: record,
            device_id: record.device_id,
            value: this.checkIfKeyExists(record.thing_name),
            viewValue: this.checkIfKeyExists(record.name),
            thing_name: this.checkIfKeyExists(record.thing_name),
          };
        });

        if (this.devices_data.length > 0) {
          this.dispensesForm
            .get('devices')
            .setValue(this.devices_data[0].value);
          this.getSupportData();
        }
      },
      error: (error) => {
        console.log('error occurred while fetching device data', error);
      },
    });
  }

  checkIfKeyExists(key: any) {
    if (key != null && key != '') {
      return key;
    } else {
      return 'Unknown';
    }
  }

  onRequestChange(data: any) {}


  getSupportData() {
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    if (session_token && session_user) {
      let request:any = {
        app_name: 'lfc-admin-client',
        function_name: 'Get-Ticket-List',
        session_token: session_token,
        session_user: session_user,
        client_code: client_code,
        thing_name: this.dispensesForm.get('devices').value
          ? this.dispensesForm.get('devices').value
          : null,
        start_date: this.dispensesForm.get('start_date').value
          ? this.dispensesForm.get('start_date').value + ' 00:00:00'
          : null,
        end_date: this.dispensesForm.get('end_date').value
          ? this.dispensesForm.get('end_date').value + ' 11:59:59'
          : null,
        limit: this.dispensesForm.get('last_request').value
          ? parseInt(this.dispensesForm.get('last_request').value)
          : null,
      };

      if(this.dispensesForm.get('support_filter_toggle').value == 'last_request'){
       delete request.start_date;
       delete request.end_date;
      }
      else{
      delete request.limit;
      }






     
          this.apis.manageTicket(request).subscribe({
            next: (res: any) => {
              this.table_data = [];
              this.table_data = res.user_list.map((user_list: any) => {
                return {
                  'Ticket ID': user_list.ticket_id,
                  Status: user_list.status_name,
                  'Comment History': user_list.comment_history
                    ? JSON.parse(user_list.comment_history)
                    : null,
                  'Open Days': this.calculateDays(user_list.requested_ts),
                  'Client Name': user_list.client_name,
                  'Device ID': user_list.device_name,
                  'Request Details': user_list.request_details,
                  'Remote Access': typeof user_list.remote_access_url == 'object' ? 'Yes' : 'No',
                  Resolution: user_list.resolution
                    ? user_list.resolution
                    : 'NA',
                  Date:
                    user_list.status_name == 'Closed'
                      ? user_list.status_ts
                      : '-',
                  // Action: ['Select','Pending', 'Resolved', 'Re-opened','Closed'],
                  Action: this.getActions(user_list.status_name),
                };
              });
            },
            error: (res: any) => {
              console.log('error occurred while fetching support requests.');
            },
          });
        
        
    }
  }

  calculateDays(dateTimeString: any) {
    const inputDateTime: any = new Date(dateTimeString);

    const currentDate: any = new Date();

    const timeDifference = currentDate - inputDateTime;

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }

  getActions(status: string) {
    if (status == 'Pending') {
      return ['select', 'Resolved'];
    } else if (status == 'Resolved') {
      return ['select', 'Re-opened', 'Closed'];
    } else if (status == 'Re-opened') {
      return ['select', 'Resolved'];
    } else {
      return ['select'];
    }
  }

  catchCommentHistory(data: any) {
    console.log(data.comments);
    let comment_history_modal_ref = this.ngbmodal.open(
      CommentHistoryComponent,
      { centered: true }
    );
    comment_history_modal_ref.componentInstance.comment_data =
      data['Comment History'];
    comment_history_modal_ref.componentInstance.status_data =
      this.ticketStatuses;
  }

  getTicketStatusList() {
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');
    let client_Code = this.local_storage.getFromLocalStorage('client_code');

    if (session_token && session_user) {
      let request = {
        app_name: 'lfc-admin-client',
        function_name: 'Get-Status-List',
        session_token: session_token,
        session_user: parseInt(session_user),
        client_code: client_Code,
      };

      this.apis.manageTicket(request).subscribe({
        next: (res) => {
          if ((res.Type = 'Success')) {
            this.ticketStatuses = res.Status_List.map((record: any) => {
              return {
                id: record.status_id,
                status: record.status_name,
              };
            });
            console.log(this.ticketStatuses);
          }
        },
        error: (err) => {},
      });
    }
  }


  exportToCsv(){
    

    
    let export_data = this.table_data.map((record:any)=>{
      let comment_history:any = [];
      if(record['Comment History']){
        
    
      record['Comment History'].forEach((comment:any)=>{
        comment_history.push(  `${comment.Comment} ${comment.Status} ${comment.Timestamp}` )
      })
      }

      return {
        'Ticket ID':record['Ticket ID'],
        'Status':record['Status'],
        'Open Days':record['Open Days'],
        'Device ID':record['Device ID'],
        'Request Details':record['Request Details'],
        'Remote Access':record['Remote Access'],
        'Resolution':record['Resolution'],
        'Date':record['Date'],
        'Comment History': comment_history.join(",") ,
       }
    })

    this.csv_export.setDataToExportAsCsv(export_data,'support_data.csv')

  }


}
