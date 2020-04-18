import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AuthenticationService } from './auth/_services/auth.service';
import { UserService } from './auth/_services/user.service';

@Component({
  selector: 'lib-mslogin',
  templateUrl: './lib-mslogin.component.html',
  styles: [
    `
      .example-heading { text-align: center; margin-top: 0; }

    `
  ]
})
export class LibMsloginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = null;
  sub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if (params) {
        this.returnUrl = params.returnUrl;
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.sub = this.authenticationService.login(this.f.name.value, this.f.password.value)
      .pipe(first())
      .subscribe((data) => {
          if (data) {
            this.returnUrl = this.returnUrl || '/dashboard';
            this.loading = false;
            this.router.navigate([this.returnUrl]);
          }
        },
          error => {
            this.error = error;
            this.loading = false;
        });
  }

  registerUser() {
    const user = {
      name: 'manjeet',
      password: 'singh',
      email: 'manjeet@singh.com'
    };
    this.sub = this.authenticationService.register(user.name, user.password, user.email).subscribe(val => console.log(val));
  }

  checkToken() {
    this.sub = this.userService.getAll().subscribe(val => console.log('this.userService.getAll()'));
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }

}
