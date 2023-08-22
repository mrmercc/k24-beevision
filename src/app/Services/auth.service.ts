import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {User, UserInfo} from "src/app/Models/UserModel";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly scope = environment.authApiBaseURL;
  private readonly loginControlKey = 'K24-HAS-BEEVISION-LOGIN';
  private readonly accessTokenKey = 'K24-BEEVISION-ACCESS-TOKEN'
  private readonly userInfo = 'K24-BEEVISION-USER-INFO'
  private readonly refreshToken = 'K24-BEEVISION-REFRESH-TOKEN'

  constructor(private httpClient:HttpClient){}

  public doLogin(authData: object): Observable<User> {
    return this.httpClient.post<User>(`${this.scope}/login`, authData);
  }

  public setUserData(userData: User) {
    localStorage.setItem(this.accessTokenKey, userData.accessToken);
    localStorage.setItem(this.userInfo, JSON.stringify(userData.userInfo));
    localStorage.setItem(this.refreshToken, userData.refreshToken);
    localStorage.setItem(this.loginControlKey, "true");
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(this.loginControlKey) !== null;
  }

  public getAccessToken(): string|null {
    return this.isLoggedIn() ? localStorage.getItem(this.accessTokenKey) : null;
  }

  public getUserInfo(): UserInfo | null {
    return this.isLoggedIn() ? JSON.parse(<string> localStorage.getItem(this.userInfo)) : null
  }

  public getExternalUserInfo() {
    return localStorage.getItem('k24LoginCustomerAs');
  }

  public deleteExternalUserInfo():void {
    localStorage.removeItem('k24LoginCustomerAs')
  }

  public getCustomerId():string {
    let customerId: string = '';
    if(this.getExternalUserInfo() !== null) {
      let externalInfo = JSON.parse(<string> this.getExternalUserInfo())
      customerId = externalInfo.customerid
    } else {
      let loggedInCustomer = this.getUserInfo();
      customerId = <string> loggedInCustomer?.customerId;
    }

    return customerId;
  }


  public resetUserData(): Promise<void>{
    return new Promise((resolve) => {
      localStorage.removeItem(this.accessTokenKey);
      localStorage.removeItem(this.userInfo);
      localStorage.removeItem(this.loginControlKey);
      localStorage.removeItem(this.refreshToken);
      resolve();
    })

  }


}
