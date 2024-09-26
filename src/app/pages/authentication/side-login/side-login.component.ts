import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material/material.module';
import { UserAuthService } from '../../../services/userAuthService';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {

  loading: boolean;

  constructor(private router: Router,
    private userService: UserAuthService,
    private snackBar: MatSnackBar,
  ) {
    this.loading = false;
  }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  onLogin() {
    this.loading = true;
    if (this.form.valid) {
      let $user = this.userService.login(
        this.f.uname.value ?? '',
        this.f.password.value ?? ''
      );
      $user.subscribe({
        error: (err) => {
          this.snackBar.open('Error',  'Login ou senha inválida!!!');
        },
      });
    } else {
      this.snackBar.open('Error',  'Login ou senha inválida!!!');

    }
    this.loading=false;
  }
}
