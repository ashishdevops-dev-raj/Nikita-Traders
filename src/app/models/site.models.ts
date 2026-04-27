export interface NavLink {
  label: string;
  href: string;
}

export interface StatMetricBase {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface StatMetric extends StatMetricBase {
  current: number;
}

export interface AboutCard {
  icon: string;
  title: string;
  desc: string;
  accent: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

export interface FleetData {
  type: string;
  count: number;
  icon: string;
  gradient: string;
}

export interface FleetFeature {
  icon: string;
  title: string;
  description: string;
}

export interface Client {
  name: string;
  category: string;
  color: string;
}

export interface WhyUsReason {
  icon: string;
  title: string;
  description: string;
  number: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Accessory {
  icon: string;
  name: string;
}

export interface LeadershipProfile {
  name: string;
  role: string;
  summary: string;
  image: string;
  imageAlt: string;
}

export interface OrganizationLead {
  icon: string;
  title: string;
  role: string;
  focus: string;
}
