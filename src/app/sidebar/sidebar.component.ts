import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

import { UserInfo } from 'src/app/Models/UserModel';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAdmin: boolean = false;
  userInfo: UserInfo | null;

  hasExternalUser: boolean = false;


  constructor(
    private authService: AuthService
  ) {
    this.userInfo = this.authService.getUserInfo();
  }

  ngOnInit(): void {}

  onLogout(){
    this.authService.resetUserData().then(()=>{
      window.location.href = "/login";
    });
  }

}
