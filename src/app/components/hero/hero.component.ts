import { Component } from '@angular/core';
import { ArrowRight, Download, LucideAngularModule, Mail } from 'lucide-angular';
import { EXPERIENCE, HERO_STACK, PROFILE, PROJECTS } from '../../data/resume.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly profile = PROFILE;
  readonly stack = HERO_STACK;
  readonly company = EXPERIENCE[0].company;
  readonly current = PROJECTS[0].name;
  readonly projectCount = PROJECTS.length;
  readonly icons = { ArrowRight, Download, Mail };
}
