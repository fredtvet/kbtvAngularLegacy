import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  error: string;
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.error = null;

    const credentials = this.authForm.value;
    this.userService
    .attemptAuth('login', this.authForm.value)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.error = err;
        console.log('errors:', err);
        this.isSubmitting = false;
      }
    );
  }
}
