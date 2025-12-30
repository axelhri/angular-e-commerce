import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
  pure: false,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 60, suffix = '…'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.slice(0, limit) + suffix;
  }
}
