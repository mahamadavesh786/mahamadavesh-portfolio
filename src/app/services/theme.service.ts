import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** Initial value is set by the inline script in index.html before first paint. */
  readonly theme = signal<Theme>(
    document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
  );

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage unavailable (private mode) — theme still applies for this visit.
    }
  }
}
