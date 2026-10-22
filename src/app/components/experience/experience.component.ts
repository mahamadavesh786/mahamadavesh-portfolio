import { Component } from '@angular/core';
import { Briefcase, Calendar, LucideAngularModule } from 'lucide-angular';
import { ACHIEVEMENTS, EXPERIENCE, PROJECTS } from '../../data/resume.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [LucideAngularModule, RevealDirective],
  template: `
    <section id="experience" class="section" aria-labelledby="exp-title">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="eyebrow">Professional experience</p>
          <h2 id="exp-title" class="section-title">Where I've been building</h2>
        </header>

        <ol class="timeline" role="list">
          @for (job of experience; track job.company) {
            <li class="entry" appReveal>
              <span class="marker" aria-hidden="true">
                <lucide-icon [img]="icons.Briefcase" [size]="16"></lucide-icon>
              </span>
              <article class="card job">
                <header class="job-head">
                  <div>
                    <h3>{{ job.role }}</h3>
                    <p class="company">{{ job.company }}</p>
                  </div>
                  <p class="period">
                    <lucide-icon [img]="icons.Calendar" [size]="14" aria-hidden="true"></lucide-icon>
                    {{ job.period }} <span class="dur">· {{ job.duration }}</span>
                  </p>
                </header>

                <p class="summary">{{ job.summary }}</p>

                <p class="projects-label">Projects</p>
                <ul class="chip-list">
                  @for (p of projects; track p.id) {
                    <li><a class="chip proj-chip" href="#projects">{{ p.name }}</a></li>
                  }
                </ul>

                <ul class="highlights" role="list">
                  @for (h of job.highlights; track h.label) {
                    <li><strong>{{ h.label }}.</strong> {{ h.text }}</li>
                  }
                </ul>

                <ul class="chip-list tech" aria-label="Technologies used">
                  @for (t of job.tech; track t) {
                    <li class="chip">{{ t }}</li>
                  }
                </ul>
              </article>
            </li>
          }
        </ol>

        <div class="achievements">
          <h3 class="ach-title" appReveal>Key achievements</h3>
          <ul class="ach-grid" role="list">
            @for (a of achievements; track a.label; let i = $index) {
              <li class="card interactive ach" appReveal [revealDelay]="i * 80">
                <p class="metric grad-text">{{ a.metric }}</p>
                <p class="metric-label">{{ a.label }}</p>
                <p class="metric-text">{{ a.text }}</p>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .timeline { list-style: none; margin: 0; padding: 0 0 0 36px; position: relative; }
    .timeline::before {
      content: '';
      position: absolute;
      left: 13px; top: 8px; bottom: 8px;
      width: 2px;
      background: linear-gradient(var(--accent), var(--accent-2), transparent);
      border-radius: 2px;
    }
    .entry { position: relative; }
    .marker {
      position: absolute;
      left: -36px; top: 22px;
      width: 28px; height: 28px;
      display: grid; place-items: center;
      border-radius: 50%;
      background: var(--bg);
      border: 2px solid var(--accent);
      color: var(--accent);
    }
    .job { padding: 28px; }
    .job-head { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    .job-head h3 { font-size: 1.35rem; }
    .company { color: var(--accent); font-weight: 600; margin-top: 2px; }
    .period {
      display: inline-flex; align-items: center; gap: 6px;
      height: fit-content;
      padding: 6px 12px;
      border-radius: 999px;
      background: var(--accent-soft);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text);
    }
    .dur { color: var(--text-2); font-weight: 500; }
    .summary { margin-top: 16px; color: var(--text-2); }
    .projects-label {
      margin: 20px 0 8px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-3);
    }
    .proj-chip { color: var(--text); text-decoration: none; }
    .proj-chip:hover { border-color: var(--accent); }
    .highlights { list-style: none; padding: 0; margin: 22px 0 0; display: grid; gap: 12px; }
    .highlights li {
      position: relative;
      padding-left: 22px;
      color: var(--text-2);
      font-size: 0.95rem;
    }
    .highlights li::before {
      content: '';
      position: absolute;
      left: 2px; top: 0.6em;
      width: 8px; height: 8px;
      border-radius: 2px;
      background: var(--grad);
      transform: rotate(45deg);
    }
    .highlights strong { color: var(--text); font-weight: 600; }
    .tech { margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border); }
    .achievements { margin-top: 64px; }
    .ach-title { font-size: 1.3rem; margin-bottom: 20px; }
    .ach-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      list-style: none; margin: 0; padding: 0;
    }
    .ach { padding: 22px; }
    .metric { font-family: var(--font-head); font-size: 2.4rem; font-weight: 800; line-height: 1; display: inline-block; }
    .metric-label { margin-top: 8px; font-weight: 600; }
    .metric-text { margin-top: 6px; font-size: 0.88rem; color: var(--text-2); line-height: 1.5; }
    @media (max-width: 960px) { .ach-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px) {
      .timeline { padding-left: 0; }
      .timeline::before, .marker { display: none; }
      .job { padding: 20px; }
      .ach-grid { grid-template-columns: 1fr; }
    }
  `,
})
export class ExperienceComponent {
  readonly experience = EXPERIENCE;
  readonly achievements = ACHIEVEMENTS;
  readonly projects = PROJECTS;
  readonly icons = { Briefcase, Calendar };
}
