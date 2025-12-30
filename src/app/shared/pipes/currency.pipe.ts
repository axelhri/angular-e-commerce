import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocaleService } from '../services/locale.service';

@Pipe({
  name: 'dynamicCurrency',
  standalone: true,
  pure: false,
})
export class CurrencyPipe implements PipeTransform {
  private readonly localeService = inject(LocaleService);

  transform(value: number | null | undefined, options?: { fromCents?: boolean }): string {
    if (value == null) return '';

    const amount = options?.fromCents ? value / 100 : value;
    return this.localeService.format(amount);
  }
}
