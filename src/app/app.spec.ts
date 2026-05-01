import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { of } from 'rxjs';
import { App } from './app';

describe('App contact form', () => {
  let app: App;
  const httpMock = {
    post: vi.fn()
  };

  beforeEach(() => {
    httpMock.post.mockReset();
    app = new App('browser', httpMock as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('submits inquiry successfully via Netlify function', async () => {
    httpMock.post.mockReturnValue(of({ ok: true }));

    app.contactForm = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+911234567890',
      service: 'Cab Rental Services',
      message: 'Need service quote',
      website: ''
    };

    await app.submitForm();

    expect(httpMock.post).toHaveBeenCalledWith('/.netlify/functions/request-quote', {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+911234567890',
      service: 'Cab Rental Services',
      message: 'Need service quote',
      website: ''
    });
    expect(app.formStatus).toBe('success');
  });

  it('prevents rapid repeated submissions', async () => {
    httpMock.post.mockReturnValue(of({ ok: true }));

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
