import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  readonly locale = signal(navigator.language || 'fr-FR');
  readonly currency = signal('EUR');

  readonly currencyFormatter = computed(() => {
    return new Intl.NumberFormat(this.locale(), {
      style: 'currency',
      currency: this.currency(),
    });
  });

  format(value: number): string {
    return this.currencyFormatter().format(value);
  }
}
