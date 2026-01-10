import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { useAuthForm } from '../helpers/auth-form.helper';
import { Router } from '@angular/router';
import { AuthFormComponent } from './auth-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, AuthFormComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly auth = useAuthForm(
    (data) => this.authService.login(data),
    () => this.router.navigate(['/']),
  );
}
