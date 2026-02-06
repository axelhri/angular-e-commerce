import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { BookmarksService } from '../services/bookmarks.service';
import { BookmarkResponse } from '../models/bookmark-response';

@Component({
  selector: 'app-bookmarks',
  imports: [],
  templateUrl: './bookmarks.component.html',
})
export class BookmarksComponent implements OnInit {
  private readonly bookmarkService = inject(BookmarksService);
  readonly bookmarks = signal<BookmarkResponse[]>([]);

  readonly isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.bookmarkService
      .getUserBookmarks()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.bookmarks.set(response.data);
          console.log('Bookmarks loaded', response);
        },
        error: (err) => {
          console.error('Failed to load bookmarks', err);
        },
      });
  }
}
