import { Component, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { ArrowUpRight, ExternalLink, FolderGit2, Github, Layers, LucideAngularModule, X } from 'lucide-angular';
import { PROJECTS, Project } from '../../data/resume.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [LucideAngularModule, RevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  @ViewChild('detail') private detail?: ElementRef<HTMLDialogElement>;

  readonly icons = { ArrowUpRight, ExternalLink, FolderGit2, Github, Layers, X };
  readonly projects = PROJECTS;
  readonly filters = ['All', ...Array.from(new Set(PROJECTS.flatMap((p) => p.tech)))];

  readonly activeFilter = signal('All');
  readonly selected = signal<Project | null>(null);

  readonly visible = computed(() => {
    const f = this.activeFilter();
    return f === 'All' ? this.projects : this.projects.filter((p) => p.tech.includes(f));
  });

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }

  open(project: Project): void {
    this.selected.set(project);
    const dialog = this.detail?.nativeElement;
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    const dialog = this.detail?.nativeElement;
    if (dialog?.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
    this.onClosed();
  }

  /** Fires for Escape, the close button and backdrop clicks. */
  onClosed(): void {
    document.body.style.overflow = '';
  }

  onBackdropClick(event: MouseEvent): void {
    // Clicks on the <dialog> element itself (not its content) are backdrop clicks.
    if (event.target === this.detail?.nativeElement) this.close();
  }
}
