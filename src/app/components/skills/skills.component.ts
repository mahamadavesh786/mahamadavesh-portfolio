import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SKILL_GROUPS } from '../../data/resume.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [LucideAngularModule, RevealDirective],
  template: `
    <section id="skills" class="section" aria-labelledby="skills-title">
      <div class="container">
        <header class="section-head" appReveal>
          <p class="eyebrow">Technical skills</p>
          <h2 id="skills-title" class="section-title">The stack I work with</h2>
          <p class="section-sub">Grouped the way they appear on my resume — from Angular front ends to .NET services, SQL Server and Azure DevOps.</p>
        </header>

        <ul class="skills-grid" role="list">
          @for (g of groups; track g.title; let i = $index) {
            <li class="card interactive skill" [class.wide]="i === 0" appReveal [revealDelay]="(i % 3) * 70">
              <div class="skill-head">
                <span class="icon-tile">
                  <lucide-icon [img]="g.icon" [size]="20" aria-hidden="true"></lucide-icon>
                </span>
                <div>
                  <h3>{{ g.title }}</h3>
                  <p>{{ g.description }}</p>
                </div>
              </div>
              <ul class="chip-list" [attr.aria-label]="g.title + ' skills'">
                @for (item of g.items; track item) {
                  <li class="chip">{{ item }}</li>
                }
              </ul>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .skill { padding: 22px; display: flex; flex-direction: column; gap: 18px; }
    .skill.wide { grid-column: span 2; }
    .skill-head { display: flex; gap: 14px; align-items: flex-start; }
    .skill-head h3 { font-size: 1.05rem; }
    .skill-head p { font-size: 0.88rem; color: var(--text-2); margin-top: 2px; line-height: 1.5; }
    @media (max-width: 960px) {
      .skills-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 620px) {
      .skills-grid { grid-template-columns: 1fr; }
      .skill.wide { grid-column: auto; }
    }
  `,
})
export class SkillsComponent {
  readonly groups = SKILL_GROUPS;
}
