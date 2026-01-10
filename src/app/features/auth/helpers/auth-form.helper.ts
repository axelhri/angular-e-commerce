import { inject, signal, DestroyRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { passwordStrengthValidator } from '../validators/password.validator';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthForm } from '../models/auth-form';

export function useAuthForm<T>(
  submitFn: (data: AuthenticationRequest) => Observable<T>,
  onSuccess: (res: T, email: string) => void,
): AuthForm {
  const fb = inject(FormBuilder);
  const destroyRef = inject(DestroyRef);

  const isLoading = signal(false);
  const successMessage = signal<string | null>(null);
  const errorMessage = signal<string | null>(null);

  const form = fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]],
  });

  const submit = () => {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    isLoading.set(true);
    successMessage.set(null);
    errorMessage.set(null);

    const formValue = form.getRawValue();

    submitFn(formValue)
      .pipe(
        takeUntilDestroyed(destroyRef),
        finalize(() => isLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          onSuccess(res, formValue.email);
          form.reset();
        },
        error: (err: HttpErrorResponse) => {
          const msg =
            typeof err.error === 'string' ? err.error : err.error?.message || 'An error occurred';
          errorMessage.set(msg);
        },
      });
  };

  return { form, isLoading, successMessage, errorMessage, submit };
}
