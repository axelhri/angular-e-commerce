import { Signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface AuthForm {
  form: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  isLoading: Signal<boolean>;
  successMessage: WritableSignal<string | null>;
  errorMessage: WritableSignal<string | null>;
  submit: () => void;
}
