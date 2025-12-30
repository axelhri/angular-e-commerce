import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapStar, bootstrapStarFill, bootstrapStarHalf } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-star-rating',
  imports: [NgIcon],
  providers: [provideIcons({ bootstrapStar, bootstrapStarFill, bootstrapStarHalf })],
  templateUrl: './star-rating.component.html',
})
export class StarRatingComponent {
  rating = input.required<number>();

  protected stars = computed(() => {
    const val = this.rating();
    const fullStars = Math.floor(val);
    const hasHalfStar = val % 1 >= 0.5;

    const stars: ('full' | 'half' | 'empty')[] = new Array(fullStars).fill('full');

    if (hasHalfStar) stars.push('half');

    while (stars.length < 5) {
      stars.push('empty');
    }

    return stars;
  });
}
