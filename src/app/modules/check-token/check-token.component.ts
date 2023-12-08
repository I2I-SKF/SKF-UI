import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';



@Component({
  selector: 'app-check-token',
  templateUrl: './check-token.component.html',
  styleUrls: ['./check-token.component.scss']
})
export class CheckTokenComponent implements OnInit {
  UserId:any;
  islinkexpire = false
  clienturl:any;
  Token:any;
  client_id:any;
  areWeResettingThePassword:any = null;
  constructor(private router: Router, private apicall:ApiService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    window.history.forward()
    this.Token = this.route.snapshot.paramMap.get("Token")    
    this.route.queryParams.subscribe(params => {
    this.client_id = params['client_code'];
    this.apicall.client_code = this.client_id;
    this.apicall.areWeResetting = params['reset'];


    

    
    });
    this.apicall.token= this.Token
    var jsondata = {
        "app_name":this.apicall.appname,
        "function_name": "Token-Validation",
        "token": this.Token,
        "client_code":this.client_id
        
      }


  
      this.apicall.managePasswords_ValidateToken(jsondata).subscribe((res: any) => {
        if (res.errorMessage) {
          this.islinkexpire = true
  
        }
        else if (res["Code"] == 1) {
          this.UserId = res["User_ID"]
          this.apicall.UserId = this.UserId
          console.log(this.apicall.UserId);
          
          this.apicall.isTokenCheck=true

          this.router.navigate(['set-password']);
  
        }
        else if (res["Code"] == "TokenNotFound" || res["Code"] == "KeyError" || res["Code"] == "TypeError" || res["Code"] == "Exception") {
  
          this.islinkexpire = true
          this.apicall.isTokenCheck=false

        }
        else {
          this.islinkexpire = true
          this.apicall.isTokenCheck=false

  
        }
      })

    

  }

}
