import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { useAuthForm } from '../helpers/auth-form.helper';
import { AuthFormComponent } from './auth-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, AuthFormComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);

  readonly auth = useAuthForm(
    (data) => this.authService.register(data),
    (_, email) => this.auth.successMessage.set(`Email sent to ${email}`),
  );
}
