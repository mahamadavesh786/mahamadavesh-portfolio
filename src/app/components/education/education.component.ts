import { Component } from '@angular/core';
import { Award, BookOpen, GraduationCap, LucideAngularModule } from 'lucide-angular';
import { EDUCATION } from '../../data/resume.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [LucideAngularModule, RevealDirective],
  template: `
    <section id="education" class="section" aria-labelledby="edu-title">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="eyebrow">Education &amp; training</p>
          <h2 id="edu-title" class="section-title">Where it started</h2>
        </header>

        <ul class="edu-grid" role="list">
          @for (e of education; track e.title; let i = $index) {
            <li class="card interactive edu" appReveal [revealDelay]="i * 80">
              <span class="icon-tile">
                <lucide-icon [img]="iconFor(e.kind)" [size]="20" aria-hidden="true"></lucide-icon>
              </span>
              <div>
                <p class="period">{{ e.period }}</p>
                <h3>{{ e.title }}</h3>
                <p class="inst">{{ e.institution }}</p>
                @if (e.details) {
                  <p class="details">{{ e.details }}</p>
                }
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .edu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
      list-style: none; margin: 0; padding: 0;
    }
    .edu { display: flex; gap: 18px; padding: 26px; align-items: flex-start; }
    .period {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--accent);
      letter-spacing: 0.04em;
    }
    h3 { font-size: 1.2rem; margin-top: 6px; }
    .inst { color: var(--text); font-weight: 500; margin-top: 2px; }
    .details { color: var(--text-2); margin-top: 10px; font-size: 0.93rem; }
    @media (max-width: 400px) {
      .edu-grid { grid-template-columns: 1fr; }
      .edu { flex-direction: column; padding: 20px; }
    }
  `,
})
export class EducationComponent {
  readonly education = EDUCATION;

  iconFor(kind: string) {
    if (kind === 'certification') return Award;
    if (kind === 'training') return BookOpen;
    return GraduationCap;
  }
}
