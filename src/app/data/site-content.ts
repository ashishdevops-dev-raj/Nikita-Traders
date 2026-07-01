import {
  AboutCard,
  Accessory,
  Client,
  FleetData,
  FleetFeature,
  LeadershipProfile,
  NavLink,
  OrganizationLead,
  Service,
  StatMetricBase,
  TimelineItem,
  WhyUsReason
} from '../models/site.models';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'Services', href: 'services' },
  { label: 'Fleet', href: 'fleet' },
  { label: 'Clients', href: 'clients' },
  { label: 'Why Us', href: 'why-us' },
  { label: 'Contact', href: 'contact' }
];

export const STATS: StatMetricBase[] = [
  { value: 150, suffix: '+', label: 'Fleet Vehicles', icon: 'directions_car' },
  { value: 15, suffix: '+', label: 'Years of Experience', icon: 'history' },
  { value: 28, suffix: '+', label: 'Major Clients Served', icon: 'handshake' },
  { value: 4, suffix: '+', label: 'Industry Sectors', icon: 'business' }
];

export const ABOUT_CARDS: AboutCard[] = [
  {
    icon: 'visibility',
    title: 'Our Vision',
    desc: 'To become one of India’s most trusted business partners for transportation, procurement, and institutional supply services through innovation, integrity, and customer satisfaction.',
    accent: '#667eea'
  },
  {
    icon: 'rocket_launch',
    title: 'Our Mission',
    desc: 'To provide dependable transportation and procurement solutions that help organizations operate more efficiently while maintaining the highest standards of quality and professionalism.',
    accent: '#f5576c'
  },
  {
    icon: 'favorite',
    title: 'Our Commitment',
    desc: 'To build long-term relationships through reliable service, transparent operations, and a customer-first approach across every engagement.',
    accent: '#43e97b'
  }
];

export const SERVICES: Service[] = [
  {
    icon: 'local_taxi',
    title: 'Corporate Transportation',
    description: 'Reliable corporate vehicle solutions including rental, fleet management, driver-with-vehicle support, employee transportation, and long-term deployment.',
    features: ['Corporate Vehicle Rental', 'Fleet Management', 'Driver with Vehicle', 'Employee Transportation', 'Site Operations Support'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: 'settings',
    title: 'Fleet Management',
    description: 'Professional fleet management services to ensure vehicle uptime, driver compliance, cost control, and efficient deployment across corporate operations.',
    features: ['Vehicle Scheduling', 'Preventive Maintenance', 'Performance Tracking', 'Driver Compliance', 'Long-Term Vehicle Contracts'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: 'inventory_2',
    title: 'Institutional Grocery Supply',
    description: 'Comprehensive grocery and consumables supply for institutions, including dry ration, kitchen essentials, housekeeping materials, and recurring procurement.',
    features: ['Grocery Supply', 'Dry Ration Supply', 'Kitchen Essentials', 'Housekeeping Consumables', 'Customized Supply Contracts'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    icon: 'shopping_cart',
    title: 'Procurement Services',
    description: 'Tailored procurement solutions for businesses and institutions, focused on quality sourcing, vendor coordination, and reliable contract execution.',
    features: ['Monthly Institutional Procurement', 'Quality Sourcing', 'Vendor Management', 'Tender Coordination', 'Contract Fulfillment'],
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
];

export const FLEET_DATA: FleetData[] = [
  { type: 'Sedan Cabs', count: 70, icon: 'directions_car', gradient: 'linear-gradient(135deg, #0f2b46, #1a4a73)' },
  { type: 'SUV Vehicles', count: 60, icon: 'airport_shuttle', gradient: 'linear-gradient(135deg, #1a3d5c, #2a6496)' },
  { type: 'Hatchbacks', count: 20, icon: 'drive_eta', gradient: 'linear-gradient(135deg, #d4a853, #e8c875)' },
  { type: 'Traveller', count: 12, icon: 'airport_shuttle', gradient: 'linear-gradient(135deg, #355f8c, #4a7bb1)' },
  { type: 'Bus', count: 8, icon: 'directions_bus', gradient: 'linear-gradient(135deg, #2f4f78, #3f6aa0)' }
];

export const FLEET_FEATURES: FleetFeature[] = [
  { icon: 'gps_fixed', title: 'Real-time GPS Tracking', description: 'Live tracking & communication system for all vehicles in the fleet' },
  { icon: 'build', title: 'Authorized Maintenance', description: 'Monthly checks at authorized workshops with detailed condition reports' },
  { icon: 'verified_user', title: 'Full Safety Kit', description: 'Fire extinguisher, first-aid kit, torch, umbrella, safety manuals' },
  { icon: 'speed', title: 'Speed Monitoring', description: 'Speed-limit trackers & patrolling staff for surprise inspections' },
  { icon: 'badge', title: 'Verified Chauffeurs', description: 'Background checked through reputed agency with photo & document records' },
  { icon: 'medical_services', title: 'Medical Checkups', description: 'Half-yearly medical including physical exam, eye test & blood test' }
];

export const CLIENTS: Client[] = [
  { name: 'Airtel Telecom', category: 'Telecom', color: '#ed1c24' },
  { name: 'Jio Telecom', category: 'Telecom', color: '#0052cc' },
  { name: 'BSNL Telecom', category: 'Telecom', color: '#008272' },
  { name: 'WTTIL (WTI Infrastructure)', category: 'Infrastructure', color: '#2d5f2d' },
  { name: 'Solasta', category: 'Infrastructure', color: '#8b5cf6' },
  { name: 'Mediversal Hospital', category: 'Healthcare', color: '#0f766e' },
  { name: 'KT Global School', category: 'Education', color: '#2563eb' },
  { name: 'Coca-Cola', category: 'FMCG', color: '#e31937' },
  { name: 'Blinkit', category: 'Quick Commerce', color: '#f9ce1d' },
  { name: 'Zomato', category: 'Food Delivery', color: '#e23744' }
];

export const WHY_US_REASONS: WhyUsReason[] = [
  { icon: 'history', title: 'Established Since 2009', description: 'A trusted business enterprise built on strong fundamentals and long-term reliability.', number: '01' },
  { icon: 'workspace_premium', title: '15+ Years of Industry Experience', description: 'A proven track record of dependable service delivery across diverse industry requirements.', number: '02' },
  { icon: 'groups', title: 'Professional & Dedicated Team', description: 'Experienced professionals committed to operational excellence and responsive service.', number: '03' },
  { icon: 'apartment', title: 'Corporate Service Standards', description: 'Structured processes and disciplined execution aligned with business expectations.', number: '04' },
  { icon: 'price_check', title: 'Competitive Pricing', description: 'Cost-effective solutions designed to support institutional and corporate budgets.', number: '05' },
  { icon: 'schedule_send', title: 'Timely Delivery', description: 'Focused on consistent execution and on-time delivery for every assignment.', number: '06' },
  { icon: 'local_shipping', title: 'Reliable Fleet Management', description: 'Professional transportation operations backed by managed fleet support and accountability.', number: '07' },
  { icon: 'inventory_2', title: 'Quality Procurement', description: 'Institutional supply solutions delivered with quality and consistency at the core.', number: '08' },
  { icon: 'handshake', title: 'Long-Term Business Relationships', description: 'Trusted by clients who value continuity, transparency, and dependable partnership.', number: '09' }
];

export const TIMELINE: TimelineItem[] = [
  { year: '2009', title: 'Founded', description: 'Nikita Traders was established in 2009 with a focus on corporate transportation services.', icon: 'flag' },
  { year: '2015', title: 'Business Expansion', description: 'Operations evolved to support broader corporate and institutional requirements with greater reach.', icon: 'trending_up' },
  { year: '2020', title: 'Institutional Supply Growth', description: 'Expanded into procurement and institutional supply solutions for diverse business needs.', icon: 'inventory_2' },
  { year: '2026', title: 'Trusted Enterprise Partner', description: 'Today, the company serves organizations across multiple sectors with professionalism and consistency.', icon: 'public' }
];

export const CORE_VALUES: string[] = ['Integrity', 'Commitment', 'Professionalism', 'Quality', 'Reliability', 'Customer First', 'Transparency', 'Long-Term Partnership'];

export const ACCESSORIES: Accessory[] = [
  { icon: 'local_fire_department', name: 'Fire Extinguisher' },
  { icon: 'build', name: 'Toolkit' },
  { icon: 'umbrella', name: 'Umbrella' },
  { icon: 'flashlight_on', name: 'Torch' },
  { icon: 'menu_book', name: 'Safety Manual' },
  { icon: 'medical_services', name: 'First-Aid Kit' },
  { icon: 'phone', name: 'Emergency Numbers' },
  { icon: 'speed', name: 'Speed Tracker' }
];

export const LEADERSHIP_PROFILE: LeadershipProfile = {
  name: 'Bharat Kumar',
  role: 'Founder & Proprietor',
  summary:
    'Bharat Kumar founded Nikita Traders and leads the company’s overall business operations, corporate transportation services, fleet operations, client relationship management, and strategic growth.',
  image: 'bharat-kumar.png',
  imageAlt: 'Bharat Kumar, Founder and Proprietor of Nikita Traders'
};

export const ORGANIZATION_LEADS: OrganizationLead[] = [
  {
    icon: 'engineering',
    title: 'Bharat Kumar',
    role: 'Founder & Proprietor',
    focus: 'Business strategy, corporate transportation, fleet operations, and client relationships'
  },
  {
    icon: 'manage_accounts',
    title: 'Manish Kumar',
    role: 'Business Partner – Institutional Supply & Business Development',
    focus: 'Institutional procurement, grocery supply, vendor management, tender coordination, and client servicing'
  }
];
