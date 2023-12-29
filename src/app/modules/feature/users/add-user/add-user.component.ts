import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { UsersService } from '../users.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonAlertComponentComponent } from 'src/app/shared/components/common-alert-component/common-alert-component.component';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { VALIDATION_PATTERNS, patternValidator,trimString } from 'src/app/shared/validators/validators/pattern.validator';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit,OnDestroy {

  userForm:any;
  isEditModeOn:boolean = false;
  rowData:any = null;
  rowData_subscription:any =null
  activate_token:any = null;
  login_url:any;
  token_verification_link:any = null;
  selectedItems: any = [];
  constructor(private router:Router,private ngb_modal:NgbModal,private local_storage: LocalStorageService,private breadcrumbs :BreadcrumbService,private fb:FormBuilder,private users_service:UsersService,private apis:ApiService){
    this.userForm = this.fb.group({
      name:['',[Validators.required,patternValidator(VALIDATION_PATTERNS.ONLY_SPACES.PATTERN,VALIDATION_PATTERNS.ONLY_SPACES.VALIDATION_MSG)]],
      email:['',[Validators.required,patternValidator(VALIDATION_PATTERNS.ONLY_SPACES.PATTERN,VALIDATION_PATTERNS.ONLY_SPACES.VALIDATION_MSG) ,patternValidator(VALIDATION_PATTERNS.EMAIL.PATTERN,VALIDATION_PATTERNS.EMAIL.VALIDATION_MSG) ]],
    
      role:['',[Validators.required]],
      contact_number:['',[Validators.required,patternValidator(VALIDATION_PATTERNS.ONLY_SPACES.PATTERN,VALIDATION_PATTERNS.ONLY_SPACES.VALIDATION_MSG),patternValidator(VALIDATION_PATTERNS.PHONE.PATTERN,VALIDATION_PATTERNS.PHONE.VALIDATION_MSG)]]

    })
  }
  userRoles: any = [
    { value: '1', viewValue: 'Admin' },
    { value: '2', viewValue: 'Site Manager' },
    { value: '3', viewValue: 'Device Manager' },
  ];
 

  
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'value',
    textField: 'viewValue',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
  };
  ngOnInit(): void {
    this.token_verification_link = `${window.location.href.split("/")[0]}//${window.location.href.split("/")[2]}`;
    this.login_url = `${window.location.href.split("/")[0]}//${window.location.href.split("/")[2]}`;
    this.breadcrumbs.setBreadcrumb([
      {
        name:'Home',
        link:'/feature/home'
      },
     
      {
        name:'Users',
        link:'/feature/users'
      },
      {
        name:'Add User',
        link:''
      },
     
    ]);

    this.rowData_subscription = this.users_service.sharedData$.subscribe({
      next:(res)=>{
        if(res){
          this.rowData = res;
          this.userForm.addControl('status', this.fb.control('', Validators.required));

          this.isEditModeOn = true;
          console.log(this.rowData,this.userForm);

          let user_roles: any[] = this.rowData['roles'].split(',');

          this.selectedItems = this.userRoles.filter((user_role: any) =>
            user_roles.includes(user_role.value)
          );

          this.userForm.patchValue({
            name:this.rowData.name,
            email:this.rowData.email,
            status: this.rowData.status_id == 3 ? true : false ,
            // role:this.rowData.roles,
            contact_number:this.rowData.mobile
      
          })

        }
        
         
      },
      error:(err)=>{

      }
    })


  }
  rowClick(){

  }
  closeModal(){
    
  }


  
  sendMail() {
    
    let formData = this.userForm.value;
    let client_code = this.local_storage.getFromLocalStorage('client_code');
    let request = {
     
      mail_type: "Create-User-Client",
      subject: 'Your LFC Cloud Account',
      token_verification_link: this.token_verification_link,
      activate_token: this.activate_token,
      user_email: trimString(formData.email),
      login_url:this.login_url,
      user_name: trimString(formData.name),
      client_code: client_code,

    };

    this.apis.sendEmail(request).subscribe({
      next: (res) => {
        this.activate_token = null
        console.log(res);
        if(res.Type=='Success'){
        
          
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent,{centered:true});
          modal_ref.componentInstance.alertData = {
            alert_title: 'Success!',
            alert_body: res.Msg ? res.Msg : 'Mail sent successfully',
      
    
            alert_actions: [
              {
                button_name: 'Close',
                type: 1,
                button_value: 1,
              },
            ],
          };

          modal_ref.result.then(res=>{
            this.router.navigate(['/feature/users'])
          })
         
         
        }
        else{
          
         
          let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent,{centered:true});
          modal_ref.componentInstance.alertData = {
            alert_title: 'Error',
            alert_body: res.Msg ? res.Msg : 'Something went wrong',
      
    
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
      error: (err) => {
        this.activate_token = null
        console.log('error ocurred while sending an email...', err);
      }
      
    });
  }

  
  createUser() {
    let form_data = this.userForm.value;

    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');
    let client_code = this.local_storage.getFromLocalStorage('client_code');

    if (session_token && session_user && client_code) {

      let user_roles: any = [];
      form_data.role.forEach((element: any) => {
        user_roles.push(element.value);
      });

      let request = {
        app_name: 'lfc-admin-client',
        function_name: 'User-Creation',
        client_code: client_code,
        session_token: session_token,
        session_user: session_user,
        name: trimString(form_data.name),
        email: trimString(form_data.email),
        mobile: trimString(form_data.contact_number.toString()),
        roles: user_roles.join(','),
      };
      this.apis.manageUser(request).subscribe({
        next: (res) => {
          console.log(res);
          if (res.Type == 'Success') {
            
            this.activate_token = res.activate_token;

  
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });
            modal_ref.componentInstance.alertData = {
              alert_title: 'User Added.',
              alert_body: res.Msg,

              alert_actions: [
                {
                  button_name: 'Close',
                  type: 1,
                  button_value: 1,
                },
              ],
            };
            this.sendMail();
           


          }
          else{
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent,{centered:true});
            modal_ref.componentInstance.alertData = {
              alert_title: 'Error',
              alert_body: res.Msg ? res.Msg :'Something went wrong',
        
      
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
        error: (err) => {
          console.log('error while creating user', err);
        },
      });
    } else {
   
      let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
        centered: true,
      });
      modal_ref.componentInstance.alertData = {
        alert_title: 'Alert',
        alert_body: 'Session details not found!',

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

  updateUser() {
    let form_data = this.userForm.value;
    console.log(form_data.user_role);

    let user_roles: any = [];
    form_data.role.forEach((element: any) => {
      user_roles.push(element.value);
    });

  

    let session_token = this.local_storage.getFromLocalStorage('session_token');
    let session_user = this.local_storage.getFromLocalStorage('session_user');
    let client_code = this.local_storage.getFromLocalStorage('client_code');

    if (session_user && session_token && client_code) {
      let request = {
        app_name: 'lfc-admin-client',
        session_token: session_token,
        session_user: session_user ? parseInt(session_user) : session_user,
        function_name: 'Update-User',
        client_code: client_code,
        name: trimString(form_data.name),
        email: trimString(form_data.email),
        mobile:trimString(form_data.contact_number.toString()),
        status_id: form_data.status ? 3:1 ,
        roles:  user_roles.join(','),
        user_id: this.rowData.user_id,
      };
      this.apis.manageUser(request).subscribe({
        next: (res) => {
          console.log(res);
          if ((res.Type = 'Success')) {
           
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });
            modal_ref.componentInstance.alertData = {
              alert_title: 'User Updated.',
              alert_body: res.Msg,

              alert_actions: [
                {
                  button_name: 'Close',
                  type: 1,
                  button_value: 1,
                },
              ],
            };
            modal_ref.result.then((res)=>{
              this.router.navigate(['/feature/users'])
            })
          }
          else{
            let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
              centered: true,
            });
            modal_ref.componentInstance.alertData = {
              alert_title: 'Error',
              alert_body: res.Msg ? res.Msg : 'Something went wrong',

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
        error: (err) => {
          console.log('error ocurred while updating user list ...', err);
        },
      });
    } else {
      
      let modal_ref = this.ngb_modal.open(CommonAlertComponentComponent, {
        centered: true,
      });
      modal_ref.componentInstance.alertData = {
        alert_title: 'Alert',
        alert_body: 'Session Token/Session User not found!',

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



  ngOnDestroy(): void {
    if(this.rowData_subscription){
      this.users_service.setSharedData(null)
      this.rowData_subscription.unsubscribe();
    }
  }
}
