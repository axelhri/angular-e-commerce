import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  readonly locale = signal(navigator.language || 'fr-FR');

  readonly currency = computed(() => {
    if (this.locale().startsWith('fr')) return 'EUR';
    if (this.locale().startsWith('en-US')) return 'USD';
    return 'USD';
  });

  readonly currencyFormatter = computed(() => {
    return new Intl.NumberFormat(this.locale(), {
      style: 'currency',
      currency: this.currency(),
      currencyDisplay: 'symbol',
    });
  });

  format(value: number): string {
    return this.currencyFormatter().format(value);
  }
}
