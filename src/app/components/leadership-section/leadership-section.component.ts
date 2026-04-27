import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { LEADERSHIP_PROFILE, ORGANIZATION_LEADS } from '../../data/site-content';

@Component({
  selector: 'app-leadership-section',
  standalone: true,
  imports: [NgFor],
  templateUrl: './leadership-section.component.html',
  styleUrl: './leadership-section.component.scss'
})
export class LeadershipSectionComponent {
  leadershipProfile = LEADERSHIP_PROFILE;
  organizationLeads = ORGANIZATION_LEADS;
}
