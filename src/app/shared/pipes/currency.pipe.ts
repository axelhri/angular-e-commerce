import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocaleService } from '../services/locale.service';

@Pipe({
  name: 'dynamicCurrency',
  standalone: true,
  pure: false,
})
export class CurrencyPipe implements PipeTransform {
  private localeService = inject(LocaleService);

  transform(value: number | null | undefined): string {
    if (value == null) return '';
    return this.localeService.format(value);
  }
}
