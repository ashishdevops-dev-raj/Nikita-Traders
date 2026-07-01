import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-leadership-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './leadership-section.component.html',
  styleUrl: './leadership-section.component.scss'
})
export class LeadershipSectionComponent {
  executiveProfiles = [
    {
      name: 'Bharat Kumar',
      designation: 'Founder & Proprietor',
      description: 'Founder of Nikita Traders and responsible for overall business operations, corporate transportation services, client relationship management, fleet operations, and strategic business growth.',
      highlights: [
        'Business Strategy',
        'Corporate Transportation',
        'Fleet Operations',
        'Business Growth',
        'Client Relationship Management'
      ]
    },
    {
      name: 'Manish Kumar',
      designation: 'Business Partner – Institutional Supply & Business Development',
      description: 'Responsible for institutional procurement, grocery supply, business development, vendor management, tender coordination, and institutional client servicing.',
      highlights: [
        'Institutional Procurement',
        'Grocery Supply',
        'Vendor Management',
        'Business Development',
        'Tender Coordination',
        'Client Servicing'
      ]
    }
  ];
}
