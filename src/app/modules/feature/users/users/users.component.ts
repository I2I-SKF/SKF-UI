import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
import { UsersService } from '../users.service';
import { FormBuilder } from '@angular/forms';
import { ExportCsvService } from 'src/app/shared/services/export-csv.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  displayed_columns = [
    // 'User ID',
    'User Name',
    'User Role',
    'Email',
    'Contact No',
    'Status',
    // "Last Log In",
    'Action',
  ];

  data:any = [];
  user_form:any;
  constructor(
    private local_storage: LocalStorageService,
    private breadcrumbs: BreadcrumbService,
    private ngb_modal: NgbModal,
    private router: Router,
    private apis: ApiService,
    private users_service:UsersService,
    private fb:FormBuilder,
    private csv_export:ExportCsvService
  ) {

    this.user_form = this.fb.group({
      user_status:['all']
    })
  }

  addUser() {
    //  this.ngb_modal.open(AddUserComponent,{centered:true})
    this.router.navigate(['/feature/users/add-user']);
  }
  ngOnInit(): void {
    this.breadcrumbs.setBreadcrumb([
      {
        name: 'Home',
        link: '/feature/home',
      },

      {
        name: 'Users',
        link: '',
      },
    ]);
   
    this.getUserStatusList();
  }

  getUserRolesFromCodes(data: string) {
    if (data != 'Unknown') {
      return data
        .split(',')
        .map((role: any) => {
          if (role == '1') {
            return 'Admin';
          }
          if (role == '3') {
            return 'Device Manager';
          }
          if (role == '2') {
            return 'Site Manager';
          }
          return '';
        })
        .join(',');
    } else {
      return data;
    }
  }

  onUserStatusChange(data: any) {
    let selected_status = data.target.value;
    if (this.status_wise_filter_data.length > 0) {
      this.data = this.status_wise_filter_data;
    } else {
      this.status_wise_filter_data = this.data;
    }

    if (selected_status != 'all') {
      let data = this.data.filter(
        (record: any) => record.Status == selected_status
      );
      this.data = data;
    }

   
  }
  getUserStatus(userId:any){
   return  this.user_status_list.find((user:any)=>user.status_id == userId).status_name;
  }

  status_wise_filter_data:any=[];
  onSearch(search_value: any) {

   let  search_query = search_value.target.value;

    this.user_form.get('device_status')?.setValue('all')
    if (this.status_wise_filter_data.length > 0) {
      this.data = this.status_wise_filter_data;
    } else {
      this.status_wise_filter_data = this.data;
    }


    if(search_query!=''){

      let data = this.data.filter((record:any)=>record['User Name'].includes(search_query));
      this.data = data;

    }
    else{
      this.status_wise_filter_data = this.data;
    }



   
  }
  onClickSearch(data: any) {}

  getRoleFromId(id:any){

    if(id == 1){
      return 'Admin'
    }
    else if(id==2){
      return 'Device Manager'
    }
    else{
      return 'Site Manager'
    }

  }

  catchTableButtonClick(data:any){
   console.log(data);
  this.users_service.setSharedData(data.row.data);
  this.router.navigate(['/feature/users/add-user'])
  }

  




  getUsersData() {
    this.data = [];
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let request = {
      app_name: 'lfc-admin-client',
      session_token: session_token,
      session_user: session_user,
      function_name: 'Get-User-List',
      client_code: client_code,
    };
    this.apis.manageUser(request).subscribe({
      next: (res) => {
        if (res.Type == 'Success') {
          this.data = res.user_list.map((user: any) => {
            return {
              'User ID': user.user_id,
              'User Role':  this.getUserRolesFromCodes(user.roles),
              user_role_id: user.roles,
              'User Name': user.name,
               Email: user.email,
              'Contact No': user.mobile,
              Status: this.getUserStatus(user.status_id) ,
              status_id: this.getUserStatus(user.status_id) ,
              data: user,
            };
          });
         
        } else {
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
            centered: true,
          });
          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg?res.Msg:'Something went wrong',

            alert_actions: [
              {
                button_name: 'Close',
                type: 1,
                button_value: 1,
              },
            ],
          };
        }
      },
      error: (err) => {},
    });
  }

  user_status_list:any = [];

  getUserStatusList() {
    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let request = {
      app_name: 'lfc-admin-client',
      session_token: session_token,
      session_user: session_user,
      function_name: 'Get-User-Status-List',
      client_code: client_code,
    };
    this.apis.manageUser(request).subscribe({
      next: (res) => {
        this.user_status_list = res;
        this.getUsersData();
      },
      error: (err) => {
        console.log('error ocurred while fetching user status list ...', err);
      },
    });
  }


  exportToCsv(){
   
    
    let export_data = this.data.map((record:any)=>{
      return {
        'User Name':record['User Name'],
        'User Role':record['User Role'],
        'Email':record['Email'],
        'Contact No':record['Contact No'],
        'Status':record['Status'],
       }
    })

    this.csv_export.setDataToExportAsCsv(export_data,'users_data.csv')

  }

 
 
}
