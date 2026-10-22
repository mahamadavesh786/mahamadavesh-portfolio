import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Check,
  CircleAlert,
  CircleCheck,
  Copy,
  Github,
  Linkedin,
  LoaderCircle,
  LucideAngularModule,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-angular';
import { CONTACT_FORM, PROFILE } from '../../data/resume.data';
import { RevealDirective } from '../../shared/reveal.directive';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);

  readonly profile = PROFILE;
  readonly icons = { Check, CircleAlert, CircleCheck, Copy, Github, Linkedin, LoaderCircle, Mail, MapPin, Phone, Send };

  readonly state = signal<SubmitState>('idle');
  readonly copied = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(3000)]],
    botField: [''],
  });

  showError(name: 'name' | 'email' | 'subject' | 'message'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  errorText(name: 'name' | 'email' | 'subject' | 'message'): string {
    const e = this.form.controls[name].errors;
    if (!e) return '';
    if (e['required']) return 'This field is required.';
    if (e['email']) return 'Enter a valid email address.';
    if (e['minlength']) return `Please enter at least ${e['minlength'].requiredLength} characters.`;
    if (e['maxlength']) return `Please keep this under ${e['maxlength'].requiredLength} characters.`;
    return 'Invalid value.';
  }

  /** Pre-filled mailto fallback using whatever the visitor has typed so far. */
  get mailtoHref(): string {
    const v = this.form.getRawValue();
    const subject = encodeURIComponent(v.subject || 'Hello from your portfolio');
    const body = encodeURIComponent(v.message ? `${v.message}\n\n— ${v.name} (${v.email})` : '');
    return `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const firstInvalid = document.querySelector<HTMLElement>('#contact-form .ng-invalid:not(form)');
      firstInvalid?.focus();
      return;
    }

    this.state.set('sending');
    const v = this.form.getRawValue();
    const fields = {
      name: v.name.trim(),
      email: v.email.trim(),
      subject: v.subject.trim(),
      message: v.message.trim(),
    };

    try {
      const sent = CONTACT_FORM.provider === 'netlify'
        ? await this.sendNetlify(fields, v.botField)
        : await this.sendFormSubmit(fields, v.botField);
      if (!sent) throw new Error('Submission rejected');
      this.state.set('success');
      this.form.reset();
    } catch {
      this.state.set('error');
    }
  }

  /** Netlify Forms accepts urlencoded POSTs to any static path. See README. */
  private async sendNetlify(fields: Record<string, string>, honeypot: string): Promise<boolean> {
    const body = new URLSearchParams({ 'form-name': 'contact', ...fields, 'bot-field': honeypot });
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    return res.ok;
  }

  /** formsubmit.co emails the message to PROFILE.email. Works on GitHub Pages. */
  private async sendFormSubmit(fields: Record<string, string>, honeypot: string): Promise<boolean> {
    const res = await fetch(`https://formsubmit.co/ajax/${this.profile.email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...fields,
        _subject: `Portfolio: ${fields['subject']}`,
        _replyto: fields['email'],
        _template: 'table',
        _captcha: 'false',
        _honey: honeypot,
      }),
    });
    if (!res.ok) return false;
    const data = await res.json().catch(() => null);
    return data?.success === true || data?.success === 'true';
  }

  resetState(): void {
    this.state.set('idle');
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      window.location.href = `mailto:${this.profile.email}`;
    }
  }
}
