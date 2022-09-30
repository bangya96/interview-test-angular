import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../shared/token.service';
import { AuthStateService } from '../shared/auth-state.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  errors:any = null;
  isSignedIn!: boolean;
  showform: boolean = true;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
  ) {
    this.loginForm = this.fb.group({
      username: [],
      password: [],
    });
  }
  ngOnInit() {
    this.authState.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      console.log(this.isSignedIn)
      if (this.isSignedIn){
        this.router.navigate(['dashboard']);
      }
    });
  }

  onSubmit() {
    // this.loginForm.value.username = 'user@aemenersol.com';
    // this.loginForm.value.password = 'Test@123';
    this.showform = false;
    this.authService.signin(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
      },
      (error) => {
        this.errors = error.error;
        this.showform = true;
      },
      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
        this.showform = true;
      }
    );
  }
  // Handle response
  responseHandler(data:any) {
    this.token.handleData(data);
  }
}
