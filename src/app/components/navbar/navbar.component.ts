import { Component, HostListener, OnDestroy, afterNextRender, inject, signal } from '@angular/core';
import { LucideAngularModule, Menu, Moon, Sun, X } from 'lucide-angular';
import { NAV_LINKS, PROFILE } from '../../data/resume.data';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnDestroy {
  readonly theme = inject(ThemeService);
  readonly links = NAV_LINKS;
  readonly profile = PROFILE;
  readonly icons = { Menu, X, Sun, Moon };

  readonly active = signal('home');
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => this.observeSections());
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) this.closeMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 960 && this.menuOpen()) this.closeMenu();
  }

  toggleMenu(): void {
    this.menuOpen() ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    this.menuOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }

  onLinkClick(id: string): void {
    this.active.set(id);
    this.closeMenu();
  }

  private observeSections(): void {
    if (!('IntersectionObserver' in window)) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.active.set(entry.target.id);
        }
      },
      // A thin band across the middle of the viewport decides the "current" section.
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const link of this.links) {
      const el = document.getElementById(link.id);
      if (el) this.observer.observe(el);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    document.body.style.overflow = '';
  }
}
