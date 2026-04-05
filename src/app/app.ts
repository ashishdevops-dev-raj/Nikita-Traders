import { Component, signal, HostListener, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser, NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  imports: [NgFor, NgClass, NgIf, FormsModule],
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

  @ViewChild('cursorGlow', { static: false }) cursorGlow?: ElementRef;

  // Contact form
  contactForm = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };
  formStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  formMessage = '';

  // EmailJS configuration — REPLACE THESE with your actual IDs from https://www.emailjs.com/
  private readonly EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  private readonly EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  private readonly EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

  currentYear = new Date().getFullYear();

  navLinks = [
    { label: 'Home', href: 'home' },
    { label: 'About', href: 'about' },
    { label: 'Services', href: 'services' },
    { label: 'Fleet', href: 'fleet' },
    { label: 'Clients', href: 'clients' },
    { label: 'Why Us', href: 'why-us' },
    { label: 'Contact', href: 'contact' }
  ];

  stats = [
    { value: 150, suffix: '+', label: 'Fleet Vehicles', icon: 'directions_car', current: 0 },
    { value: 12, suffix: '+', label: 'Office Locations', icon: 'location_on', current: 0 },
    { value: 3, suffix: '+', label: 'States Covered', icon: 'map', current: 0 },
    { value: 300, suffix: '+', label: 'Professional Staff', icon: 'groups', current: 0 }
  ];

  services = [
    {
      icon: 'local_taxi',
      title: 'Cab Rental Services',
      description: 'Premium cab services including Sedans, SUVs, and Hatchbacks for corporate and individual travel needs with 24/7 availability.',
      features: ['Monthly Rentals', 'On-Call Services', '24/7 Availability'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: 'airport_shuttle',
      title: 'Chartered Bus Services',
      description: 'Winger, Traveller, and Starbus options for corporate events, employee transport, and group travel with complete safety.',
      features: ['Winger & Traveller', 'Starbus Fleet', 'Corporate Events'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: 'inventory_2',
      title: 'B2B Supply Solutions',
      description: 'Comprehensive supply services including groceries, beverages, wafers, and stationery for businesses across India.',
      features: ['Groceries & Beverages', 'Stationery Supplies', 'Timely Delivery'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: 'local_shipping',
      title: 'Pan-India Logistics',
      description: 'Efficient delivery network ensuring timely deliveries and seamless transport across diverse client locations nationwide.',
      features: ['Nationwide Delivery', 'Route Optimization', 'Real-time Tracking'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  fleetData = [
    { type: 'Sedan Cabs', count: 70, icon: 'directions_car', gradient: 'linear-gradient(135deg, #0f2b46, #1a4a73)' },
    { type: 'SUV Vehicles', count: 60, icon: 'airport_shuttle', gradient: 'linear-gradient(135deg, #1a3d5c, #2a6496)' },
    { type: 'Hatchbacks', count: 20, icon: 'drive_eta', gradient: 'linear-gradient(135deg, #d4a853, #e8c875)' }
  ];

  fleetFeatures = [
    { icon: 'gps_fixed', title: 'Real-time GPS Tracking', description: 'Live tracking & communication system for all vehicles in the fleet' },
    { icon: 'build', title: 'Authorized Maintenance', description: 'Monthly checks at authorized workshops with detailed condition reports' },
    { icon: 'verified_user', title: 'Full Safety Kit', description: 'Fire extinguisher, first-aid kit, torch, umbrella, safety manuals' },
    { icon: 'speed', title: 'Speed Monitoring', description: 'Speed-limit trackers & patrolling staff for surprise inspections' },
    { icon: 'badge', title: 'Verified Chauffeurs', description: 'Background checked through reputed agency with photo & document records' },
    { icon: 'medical_services', title: 'Medical Checkups', description: 'Half-yearly medical including physical exam, eye test & blood test' }
  ];

  clients = [
    { name: 'Coca Cola', category: 'Beverage Supplier', color: '#e31937' },
    { name: 'Wipro', category: 'IT Partnership', color: '#44187d' },
    { name: 'Airtel', category: 'Telecom Provider', color: '#ed1c24' },
    { name: 'WHO', category: 'Health Services', color: '#009edb' },
    { name: 'WTI Pvt Ltd', category: 'Transport Partner', color: '#2d5f2d' },
    { name: 'DEPL', category: 'Enterprise', color: '#1a3d5c' },
    { name: 'Solasta', category: 'Enterprise', color: '#8b5cf6' },
    { name: 'ACME Services', category: 'Service Provider', color: '#ea580c' }
  ];

  whyUsReasons = [
    { icon: 'shield', title: 'ISO Certified', description: 'Quality processes meeting international HSSE standards ensuring top-tier service delivery.', number: '01' },
    { icon: 'support_agent', title: '24/7 Helpdesk', description: 'Dedicated helpdesk with live tracking and real-time assistance for seamless operations.', number: '02' },
    { icon: 'analytics', title: 'Advanced MIS', description: 'Complete MIS generation — No Show, OTD & OTA reports, invoicing, and monthly analytics.', number: '03' },
    { icon: 'groups', title: '300+ Professionals', description: 'Trained managers, supervisors & chauffeurs with quarterly training and professional development.', number: '04' },
    { icon: 'eco', title: 'Sustainability First', description: 'Eco-friendly fleet options, responsible sourcing, and active community engagement initiatives.', number: '05' },
    { icon: 'workspace_premium', title: 'Best Value', description: 'Transparent pricing, ethical partnerships, and the best value for every rupee spent on our services.', number: '06' }
  ];

  timeline = [
    { year: '2023', title: 'Company Established', description: 'Nikita Traders founded in Odisha with the vision of becoming India\'s top transport partner.', icon: 'flag' },
    { year: '2024', title: 'Fleet Expansion', description: 'Grew to 150+ vehicles and expanded operations to Bihar & Jharkhand markets.', icon: 'trending_up' },
    { year: '2025', title: '24/7 Operations', description: 'Launched round-the-clock support, live GPS tracking, and mobile application for clients.', icon: 'rocket_launch' },
    { year: '2026', title: 'Pan-India Expansion', description: 'Expanding nationwide with new supplier partnerships and comprehensive B2B supply services across India.', icon: 'public' }
  ];

  accessories = [
    { icon: 'local_fire_department', name: 'Fire Extinguisher' },
    { icon: 'build', name: 'Toolkit' },
    { icon: 'umbrella', name: 'Umbrella' },
    { icon: 'flashlight_on', name: 'Torch' },
    { icon: 'menu_book', name: 'Safety Manual' },
    { icon: 'medical_services', name: 'First-Aid Kit' },
    { icon: 'phone', name: 'Emergency Numbers' },
    { icon: 'speed', name: 'Speed Tracker' }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
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
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isBrowser || !this.cursorGlow) return;
    const el = this.cursorGlow.nativeElement;
    el.style.left = event.clientX + 'px';
    el.style.top = event.clientY + 'px';
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
      await emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.EMAILJS_TEMPLATE_ID,
        {
          from_name: this.contactForm.name,
          from_email: this.contactForm.email,
          phone: this.contactForm.phone,
          service: this.contactForm.service || 'Not specified',
          message: this.contactForm.message
        },
        this.EMAILJS_PUBLIC_KEY
      );

      this.formStatus = 'success';
      this.formMessage = 'Thank you! Your inquiry has been sent successfully. We\'ll get back to you within 24 hours.';
      this.contactForm = { name: '', email: '', phone: '', service: '', message: '' };
    } catch {
      this.formStatus = 'error';
      this.formMessage = 'Something went wrong. Please try again or contact us directly at +91-7735479750.';
    }
  }

  ngOnDestroy() {
    this.scrollObserver?.disconnect();
    this.counterObserver?.disconnect();
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
            }, parseInt(delay));
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
