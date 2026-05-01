import { Component, signal, HostListener, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser, NgFor, NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LeadershipSectionComponent } from './components/leadership-section/leadership-section.component';
import {
  ABOUT_CARDS,
  ACCESSORIES,
  CLIENTS,
  FLEET_DATA,
  FLEET_FEATURES,
  NAV_LINKS,
  SERVICES,
  STATS,
  TIMELINE,
  WHY_US_REASONS
} from './data/site-content';
import { StatMetric } from './models/site.models';

@Component({
  selector: 'app-root',
  imports: [NgFor, NgClass, NgIf, FormsModule, LeadershipSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);
  activeSection = signal('home');
  showBackToTop = signal(false);
  isLoaded = signal(false);
  private isBrowser: boolean;
  private countersAnimated = false;
  private scrollObserver?: IntersectionObserver;
  private counterObserver?: IntersectionObserver;
  private counterTimers: ReturnType<typeof setInterval>[] = [];
  private scrollTicking = false;
  private mouseTicking = false;
  private lastMouseX = 0;
  private lastMouseY = 0;

  @ViewChild('cursorGlow', { static: false }) cursorGlow?: ElementRef;

  // Contact form
  contactForm = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: ''
  };
  formStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  formMessage = '';
  private lastSubmitAt = 0;
  private readonly SUBMIT_COOLDOWN_MS = 30_000;

  private readonly quoteEndpoint = '/.netlify/functions/request-quote';

  currentYear = new Date().getFullYear();

  navLinks = NAV_LINKS;
  stats: StatMetric[] = STATS.map((stat) => ({ ...stat, current: 0 }));
  aboutCards = ABOUT_CARDS;
  services = SERVICES;
  fleetData = FLEET_DATA;
  fleetFeatures = FLEET_FEATURES;
  clients = CLIENTS;
  whyUsReasons = WHY_US_REASONS;
  timeline = TIMELINE;
  accessories = ACCESSORIES;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private readonly http: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => this.isLoaded.set(true), 300);
      this.setupScrollObserver();
      this.setupCounterObserver();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser) return;
    if (this.scrollTicking) return;
    this.scrollTicking = true;

    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      this.isScrolled.set(scrollY > 50);
      this.showBackToTop.set(scrollY > 600);

      const sections = [...this.navLinks.map(l => l.href)].reverse();
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          this.activeSection.set(id);
          break;
        }
      }

      this.scrollTicking = false;
    });
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isBrowser || !this.cursorGlow) return;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;

    if (this.mouseTicking) return;
    this.mouseTicking = true;

    requestAnimationFrame(() => {
      const el = this.cursorGlow?.nativeElement;
      if (!el) {
        this.mouseTicking = false;
        return;
      }
      el.style.left = this.lastMouseX + 'px';
      el.style.top = this.lastMouseY + 'px';
      this.mouseTicking = false;
    });
  }

  scrollTo(sectionId: string) {
    if (!this.isBrowser) return;
    this.mobileMenuOpen.set(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop() {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.mobileMenuOpen()) {
      this.mobileMenuOpen.set(false);
    }
  }

  async submitForm() {
    // Honeypot field: bots often fill hidden inputs.
    if (this.contactForm.website.trim()) {
      return;
    }

    const now = Date.now();
    if (now - this.lastSubmitAt < this.SUBMIT_COOLDOWN_MS) {
      this.formStatus = 'error';
      this.formMessage = 'Please wait a few seconds before sending another inquiry.';
      return;
    }

    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.phone || !this.contactForm.message) {
      this.formStatus = 'error';
      this.formMessage = 'Please fill in all required fields.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contactForm.email)) {
      this.formStatus = 'error';
      this.formMessage = 'Please enter a valid email address.';
      return;
    }

    this.formStatus = 'sending';
    this.formMessage = '';

    try {
      await firstValueFrom(
        this.http.post<{ ok: boolean }>(this.quoteEndpoint, {
          name: this.contactForm.name,
          email: this.contactForm.email,
          phone: this.contactForm.phone,
          service: this.contactForm.service || 'Not specified',
          message: this.contactForm.message,
          website: this.contactForm.website
        })
      );

      this.formStatus = 'success';
      this.formMessage = 'Thank you! Your inquiry has been sent successfully. We\'ll get back to you within 24 hours.';
      this.contactForm = { name: '', email: '', phone: '', service: '', message: '', website: '' };
      this.lastSubmitAt = now;
    } catch {
      this.formStatus = 'error';
      this.formMessage = 'Something went wrong. Please try again or contact us directly at +91-7735479750.';
    }
  }

  ngOnDestroy() {
    this.scrollObserver?.disconnect();
    this.counterObserver?.disconnect();
    this.counterTimers.forEach(timer => clearInterval(timer));
  }

  private animateCounters() {
    if (this.countersAnimated) return;
    this.countersAnimated = true;

    this.stats.forEach(stat => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          stat.current = stat.value;
          clearInterval(timer);
        } else {
          stat.current = Math.floor(current);
        }
      }, duration / steps);
      this.counterTimers.push(timer);
    });
  }

  private setupCounterObserver() {
    const statsEl = document.querySelector('.hero-stats');
    if (!statsEl) return;

    this.counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.animateCounters();
        }
      },
      { threshold: 0.3 }
    );
    this.counterObserver.observe(statsEl);
  }

  private setupScrollObserver() {
    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset['delay'] || '0';
            setTimeout(() => {
              el.classList.add('visible');
            }, parseInt(delay, 10));
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.anim').forEach(el => {
      this.scrollObserver!.observe(el);
    });
  }
}
