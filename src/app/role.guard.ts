import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot ,ActivatedRoute} from '@angular/router';
import { LocalStorageService } from './shared/services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private local_storage: LocalStorageService,private router: Router) { 
   
  }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {


    let isAuthenticated = false;

    if(this.local_storage.getFromLocalStorage('session_token')){
        isAuthenticated = true
    }
    else{
      this.router.navigate(['/'])
    return false
    }


    if( this.local_storage.getFromLocalStorage('user_details')){
     let user_role =  this.local_storage.getFromLocalStorage('user_details')?.split(",") ;
     
     let set1 = new Set(user_role)
     for (const value of route.data['roles']) {
      if (set1.has(value)) {
        return true; // Common value found
      }
    }

    this.router.navigate(['/'])
    
   
    return false; // No common value found
    }
   
    else{
      this.router.navigate(['/'])
      return false
    }
   
    
    
  }

}

// admin 1, device manager 2, site manager 3

