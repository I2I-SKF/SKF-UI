import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private private_key = '@NKCNCOINCU#(*$#BCKJS';

  private encryptAndStoreData(data: string): string {
    return  CryptoJS.AES.encrypt(data, this.private_key).toString();
    
  }

 
  


  setToLocalStorage(key:string,value:string){
    let encryptedData =  this.encryptAndStoreData(value)
    localStorage.setItem(key, encryptedData);
  }

  getFromLocalStorage(key:string){
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.private_key);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return null;
  }

  







}
