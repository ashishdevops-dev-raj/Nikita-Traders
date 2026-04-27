import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import emailjs from '@emailjs/browser';
import { App } from './app';

describe('App contact form', () => {
  let app: App;

  beforeEach(() => {
    app = new App('browser');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows fallback error when EmailJS config is missing', async () => {
    app.contactForm = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+911234567890',
      service: '',
      message: 'Need service quote',
      website: ''
    };

    await app.submitForm();

    expect(app.formStatus).toBe('error');
    expect(app.formMessage).toContain('temporarily unavailable');
  });

  it('prevents rapid repeated submissions', async () => {
    vi.spyOn(emailjs, 'send').mockResolvedValue({ status: 200, text: 'ok' } as never);

    (app as any).EMAILJS_SERVICE_ID = 'service';
    (app as any).EMAILJS_TEMPLATE_ID = 'template';
    (app as any).EMAILJS_PUBLIC_KEY = 'public';

    app.contactForm = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+911234567890',
      service: 'Corporate Cab Services',
      message: 'Need monthly contract',
      website: ''
    };

    await app.submitForm();
    expect(app.formStatus).toBe('success');

    app.contactForm = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+911234567890',
      service: '',
      message: 'Second request',
      website: ''
    };
    await app.submitForm();

    expect(app.formStatus).toBe('error');
    expect(app.formMessage).toContain('Please wait');
  });
});
