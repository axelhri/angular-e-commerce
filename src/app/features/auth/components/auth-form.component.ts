import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthForm } from '../models/auth-form';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent {
  auth = input.required<AuthForm>();
  submitLabel = input<string>('Submit');

  get f() {
    return this.auth().form.controls;
  }
}
