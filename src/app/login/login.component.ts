import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/UserModel';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('passwordElement') passwordElement!: ElementRef;

  userData: User | undefined;

  hasError: boolean = false;
  errorMessage: string = '';
  defaultRoutingURL: string = '';

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  doLogin() {


    this.authService.doLogin(this.loginForm.value).subscribe((result: User) =>{
      console.log('RES', result);
      this.userData = result;
      this.authService.setUserData(result);

      this.defaultRoutingURL = this.userData.userInfo.k24admin === 'true' ? '/consignments' : '/app/shipments';

        this.router.navigateByUrl(this.defaultRoutingURL);

    }, (error)=>{
      this.hasError = true;
      this.errorMessage = error.error.errorMessage;
      console.log('An error happened !', error);

      setTimeout(()=>{
        this.hasError = false;
      }, 3500)
    })
  }

  togglePassword(){
    const element = this.passwordElement.nativeElement;
    element.type === "password" ? element.setAttribute('type', 'text') : element.setAttribute('type', 'password')
  }

}
