import { Component } from '@angular/core';
import { ABOUT, CORE_COMPETENCIES, PROFILE } from '../../data/resume.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="about" class="section" aria-labelledby="about-title">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="eyebrow">About me</p>
          <h2 id="about-title" class="section-title">Building the parts of SaaS that teams rely on every day</h2>
        </header>

        <div class="about-grid">
          <div class="story" appReveal>
            @for (p of about.paragraphs; track $index) {
              <p>{{ p }}</p>
            }
          </div>

          <ul class="strengths" role="list">
            @for (s of about.strengths; track s.title; let i = $index) {
              <li class="card interactive strength" appReveal [revealDelay]="i * 80">
                <span class="idx" aria-hidden="true">0{{ i + 1 }}</span>
                <h3>{{ s.title }}</h3>
                <p>{{ s.text }}</p>
              </li>
            }
          </ul>
        </div>

        <div class="competencies card" appReveal>
          <h3 class="comp-title">Core competencies</h3>
          <ul class="chip-list">
            @for (c of competencies; track c) {
              <li class="chip">{{ c }}</li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .about-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 48px;
      align-items: start;
    }
    .story {
      display: grid;
      gap: 18px;
      color: var(--text-2);
      font-size: 1.05rem;
    }
    .story p:first-child { color: var(--text); font-size: 1.15rem; }
    .strengths {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .strength { padding: 20px; }
    .strength h3 { font-size: 1rem; margin: 8px 0 6px; }
    .strength p { font-size: 0.9rem; color: var(--text-2); line-height: 1.55; }
    .idx { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent); }
    .competencies { margin-top: 40px; padding: 24px; }
    .comp-title {
      font-size: 0.8rem;
      font-family: var(--font-mono);
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-3);
      margin-bottom: 14px;
    }
    @media (max-width: 960px) {
      .about-grid { grid-template-columns: 1fr; gap: 32px; }
    }
    @media (max-width: 520px) {
      .strengths { grid-template-columns: 1fr; }
    }
  `,
})
export class AboutComponent {
  readonly about = ABOUT;
  readonly competencies = CORE_COMPETENCIES;
  readonly profile = PROFILE;
}
