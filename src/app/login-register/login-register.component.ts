import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  register = false;

  constructor() { }

  ngOnInit() {
  }

  loginUser(loginForm: NgForm) {
    console.log(`LoginForm : ${loginForm}`);
  }

  registerUser(registerForm: NgForm) {
    console.log(`LoginForm : ${registerForm}`);
  }

  toggleRegistration() {
    this.register = !this.register;
  }

}
