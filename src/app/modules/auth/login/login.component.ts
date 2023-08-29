import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router){

  }
  ngOnInit(){
   
      this.calltestapi();

    
  }
  calltestapi(){
    this.http.get('dsaldkasj').subscribe({
      next:(res)=>{
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
  login(){
    this.router.navigate(['/feature/dashboard'])
  }

 

}
