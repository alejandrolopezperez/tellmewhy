import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get contact_form() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) return;
    this.authService.login(this.form).subscribe((res) => {
      if (res?.body?.authenticated) {
        this.router.navigate(['']);
      }
    });
  }
}
