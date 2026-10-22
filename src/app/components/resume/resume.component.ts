import { Component } from '@angular/core';
import { Download, Eye, FileText, LucideAngularModule } from 'lucide-angular';
import { PROFILE } from '../../data/resume.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [LucideAngularModule, RevealDirective],
  template: `
    <section id="resume" class="section" aria-labelledby="resume-title">
      <div class="container">
        <div class="resume card" appReveal>
          <div class="doc" aria-hidden="true">
            <div class="doc-page">
              <span class="doc-title"></span>
              <span class="doc-sub"></span>
              <span class="doc-rule"></span>
              @for (w of lines; track $index) {
                <span class="doc-line" [style.width.%]="w"></span>
              }
            </div>
            <span class="doc-badge">
              <lucide-icon [img]="icons.FileText" [size]="16"></lucide-icon> PDF
            </span>
          </div>

          <div class="r-copy">
            <p class="eyebrow">Resume</p>
            <h2 id="resume-title" class="section-title">Prefer the one-pager version?</h2>
            <p class="section-sub">
              The full resume covers my skills, experience across Health4Community, PIQET and FEEDBACK,
              key achievements and core competencies.
            </p>
            <p class="meta">{{ profile.resumeDownloadName }} · PDF · 3 pages</p>
            <div class="r-actions">
              <a class="btn btn-primary" [href]="profile.resumeFile" [attr.download]="profile.resumeDownloadName">
                <lucide-icon [img]="icons.Download" [size]="18" aria-hidden="true"></lucide-icon>
                Download Resume
              </a>
              <a class="btn btn-ghost" [href]="profile.resumeFile" target="_blank" rel="noopener">
                <lucide-icon [img]="icons.Eye" [size]="18" aria-hidden="true"></lucide-icon>
                View in browser
                <span class="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .resume {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 56px;
      align-items: center;
      padding: 48px;
      background:
        radial-gradient(500px 260px at 0% 0%, var(--accent-soft), transparent 70%),
        var(--surface);
    }
    .doc { position: relative; justify-self: center; }
    .doc-page {
      width: 210px;
      aspect-ratio: 1 / 1.414;
      padding: 22px 18px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 30px 60px -24px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      gap: 7px;
      transform: rotate(-4deg);
      transition: transform 0.4s ease;
    }
    .resume:hover .doc-page { transform: rotate(0); }
    .doc-page span { display: block; border-radius: 2px; }
    .doc-title { height: 10px; width: 80%; margin: 0 auto; background: #3157e0; }
    .doc-sub { height: 6px; width: 40%; margin: 2px auto 4px; background: #c7cbd6; }
    .doc-rule { height: 2px; width: 100%; background: #3157e0; margin-bottom: 4px; }
    .doc-line { height: 5px; background: #e1e4ec; }
    .doc-badge {
      position: absolute;
      right: -14px; bottom: 18px;
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 12px;
      border-radius: 999px;
      background: var(--grad);
      color: #fff;
      font-size: 0.8rem;
      font-weight: 700;
    }
    .meta { margin-top: 18px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-3); word-break: break-all; }
    .r-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
    @media (max-width: 860px) {
      .resume { grid-template-columns: 1fr; gap: 36px; padding: 32px 22px; }
    }
    @media (max-width: 480px) {
      .r-actions .btn { flex: 1 1 100%; }
    }
  `,
})
export class ResumeComponent {
  readonly profile = PROFILE;
  readonly icons = { Download, Eye, FileText };
  readonly lines = [100, 92, 96, 70, 100, 88, 60, 100, 94, 80, 98, 66];
}
