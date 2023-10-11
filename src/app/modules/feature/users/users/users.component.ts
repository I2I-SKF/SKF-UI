import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  displayed_columns = [
    "User ID",
    "User Role",
    "User Name",
    "Email",
    "Contact No",
    "Status",
    "Last Log In",
    "Action"

  ];

  data = [
    {"User ID":"U12345",
    "User Role":"Admin",
    "User Name":"Alice Adams",
    "Email":"alic.adams@email.com",
    "Contact No":"555-1235",
    "Status":"Active",
    "Last Log In":"15/09/23 8:30",
    "Action":[
      "Select",
      "Edit User",
      "Suspend User",
      "Reactivate User",
      "Delete User"
    ]},
    {"User ID":"U12346",
    "User Role":"User",
    "User Name":"Bob Brown",
    "Email":"bob.brown@email.com",
    "Contact No":"555-1235",
    "Status":"Active",
    "Last Log In":"14/09/23 9:00",
    "Action":[
      "Select",
      "Edit User",
      "Suspend User",
      "Reactivate User",
      "Delete User"
    ]},
    {"User ID":"U12347",
    "User Role":"User",
    "User Name":"John Smith",
    "Email":"john.smith@email.com",
    "Contact No":"555-1235",
    "Status":"Active",
    "Last Log In":"13/09/23 9:30",
    "Action":[
      "Select",
      "Edit User",
      "Suspend User",
      "Reactivate User",
      "Delete User"
    ]},
    {"User ID":"U12348",
    "User Role":"User",
    "User Name":"Dean Robbins",
    "Email":"dean.robb@email.com",
    "Contact No":"555-1235",
    "Status":"Active",
    "Last Log In":"12/09/23 9:30",
    "Action":[
      "Select",
      "Edit User",
      "Suspend User",
      "Reactivate User",
      "Delete User"
    ]},
    {"User ID":"U12349",
    "User Role":"Admin",
    "User Name":"Alex langford",
    "Email":"alex.langford@email.com",
    "Contact No":"555-12341",
    "Status":"Active",
    "Last Log In":"11/09/23 10:00",
    "Action":[
      "Select",
      "Edit User",
      "Suspend User",
      "Reactivate User",
      "Delete User"
    ]},
    {"User ID":"U12351",
    "User Role":"User",
    "User Name":"Joke Conner",
    "Email":"jake.conner@email.com",
    "Contact No":"555-13413",
    "Status":"Active",
    "Last Log In":"13/09/23 10:00",
    "Action":[
      "Select",
      "Edit User",
      "Suspend User",
      "Reactivate User",
      "Delete User"
    ]},
    {"User ID":"U12352",
    "User Role":"User",
    "User Name":"Helena Goldburge",
    "Email":"helena.g@email.com",
    "Contact No":"555-13412",
    "Status":"Active",
    "Last Log In":"16/09/23 10:00",
    "Action":[
      "Select",
      "Edit User",
      "Suspend User",
      "Reactivate User",
      "Delete User"
    ]},
  ]
  addUser(){
    
  }
  
}
