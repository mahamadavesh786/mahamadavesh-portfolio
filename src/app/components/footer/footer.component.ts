import { Component, HostListener, signal } from '@angular/core';
import { ArrowUp, Github, Linkedin, LucideAngularModule, Mail, Phone } from 'lucide-angular';
import { NAV_LINKS, PROFILE } from '../../data/resume.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <footer class="footer">
      <div class="container f-inner">
        <div class="f-brand">
          <p class="f-name">{{ profile.displayName }}</p>
          <p class="f-role">{{ profile.title }} · Angular · .NET Core · SQL Server</p>
        </div>

        <nav aria-label="Footer">
          <ul class="f-links" role="list">
            @for (l of links; track l.id) {
              <li><a [href]="'#' + l.id">{{ l.label }}</a></li>
            }
          </ul>
        </nav>

        <ul class="f-social" role="list">
          <li>
            <a class="icon-btn" [href]="'mailto:' + profile.email" aria-label="Email">
              <lucide-icon [img]="icons.Mail" [size]="18" aria-hidden="true"></lucide-icon>
            </a>
          </li>
          <li>
            <a class="icon-btn" [href]="'tel:' + profile.phoneHref" aria-label="Phone">
              <lucide-icon [img]="icons.Phone" [size]="18" aria-hidden="true"></lucide-icon>
            </a>
          </li>
          @if (profile.linkedin) {
            <li>
              <a class="icon-btn" [href]="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <lucide-icon [img]="icons.Linkedin" [size]="18" aria-hidden="true"></lucide-icon>
              </a>
            </li>
          }
          @if (profile.github) {
            <li>
              <a class="icon-btn" [href]="profile.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <lucide-icon [img]="icons.Github" [size]="18" aria-hidden="true"></lucide-icon>
              </a>
            </li>
          }
        </ul>
      </div>
      <div class="container f-bottom">
        <p>© {{ year }} {{ profile.displayName }}. All rights reserved.</p>
      </div>
    </footer>

    <button
      type="button"
      class="to-top icon-btn"
      [class.show]="showTop()"
      [attr.tabindex]="showTop() ? 0 : -1"
      [attr.aria-hidden]="!showTop()"
      (click)="toTop()"
      aria-label="Back to top"
    >
      <lucide-icon [img]="icons.ArrowUp" [size]="18" aria-hidden="true"></lucide-icon>
    </button>
  `,
  styles: `
    .footer { border-top: 1px solid var(--border); padding: 40px 0 24px; margin-top: 40px; }
    .f-inner { display: flex; flex-wrap: wrap; gap: 24px; align-items: center; justify-content: space-between; }
    .f-name { font-family: var(--font-head); font-weight: 800; font-size: 1.1rem; }
    .f-role { color: var(--text-2); font-size: 0.88rem; }
    .f-links, .f-social { display: flex; flex-wrap: wrap; gap: 4px 18px; list-style: none; margin: 0; padding: 0; }
    .f-social { gap: 8px; }
    .f-links a { color: var(--text-2); font-size: 0.88rem; }
    .f-links a:hover { color: var(--text); }
    .f-bottom { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--border); }
    .f-bottom p { color: var(--text-3); font-size: 0.82rem; }
    .to-top {
      position: fixed;
      right: 20px; bottom: 20px;
      z-index: 40;
      background: var(--grad);
      color: #fff;
      border: none;
      box-shadow: 0 12px 30px -10px rgba(91, 140, 255, 0.6);
      opacity: 0;
      transform: translateY(12px);
      pointer-events: none;
      transition: opacity 0.25s, transform 0.25s;
    }
    .to-top:hover { color: #fff; }
    .to-top.show { opacity: 1; transform: none; pointer-events: auto; }
  `,
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly links = NAV_LINKS;
  readonly year = new Date().getFullYear();
  readonly icons = { ArrowUp, Github, Linkedin, Mail, Phone };
  readonly showTop = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.showTop.set(window.scrollY > 600);
  }

  toTop(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    // Move focus to the top so keyboard users continue from the start of the page.
    document.querySelector<HTMLElement>('.brand')?.focus({ preventScroll: true });
  }
}
