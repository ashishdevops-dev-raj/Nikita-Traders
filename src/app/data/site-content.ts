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
    desc: "To become one of India's most reliable and leading service providers by expanding transport, logistics, and supply chain solutions with long-term client trust.",
    accent: '#667eea'
  },
  {
    icon: 'rocket_launch',
    title: 'Our Evolution',
    desc: 'From local cab and bus rentals to a diversified Pan India transport and multi-category supply services company across industries.',
    accent: '#f5576c'
  },
  {
    icon: 'favorite',
    title: 'Our Commitment',
    desc: 'Quality, reliability, and timely delivery through professional execution and customer-first service standards.',
    accent: '#43e97b'
  }
];

export const SERVICES: Service[] = [
  {
    icon: 'local_taxi',
    title: 'Corporate Cab Services',
    description: 'Reliable corporate cab services for daily office movement, executive travel, and business commute support.',
    features: ['Corporate Mobility', 'On-Call Support', 'Well-Maintained Vehicles'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: 'airport_shuttle',
    title: 'Employee Transport (B2B)',
    description: 'Cab and bus employee transportation solutions with long-term deployment, route discipline, and safe operations.',
    features: ['Cab and Bus Services', 'B2B Employee Commute', 'Long-Term Contracts'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: 'inventory_2',
    title: 'Supply & Service Solutions',
    description: 'Pan India supply support for grocery, beverages, stationery, and FMCG items for monthly and bulk business demand.',
    features: ['Grocery and Bulk Supply', 'Beverages and Stationery', 'FMCG Essentials'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    icon: 'local_shipping',
    title: 'Pan India Delivery Capability',
    description: 'Integrated transport and supply distribution network enabling timely service and delivery across India.',
    features: ['Nationwide Reach', 'Timely Delivery', 'Multi-Sector Support'],
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
  { name: 'Airtel', category: 'Telecom', color: '#ed1c24' },
  { name: 'Jio', category: 'Telecom', color: '#0052cc' },
  { name: 'BSNL', category: 'Telecom', color: '#008272' },
  { name: 'Coca-Cola', category: 'FMCG & Beverages', color: '#e31937' },
  { name: 'Blinkit', category: 'Quick Commerce', color: '#f9ce1d' },
  { name: 'Zomato', category: 'Food Delivery', color: '#e23744' },
  { name: 'WTTIL (WTI)', category: 'Infrastructure', color: '#2d5f2d' },
  { name: 'Solasta', category: 'Enterprise', color: '#8b5cf6' },
  { name: 'KT Global', category: 'Odisha Client', color: '#2563eb' },
  { name: 'Mediversal Hospital', category: 'Healthcare', color: '#0f766e' }
];

export const WHY_US_REASONS: WhyUsReason[] = [
  { icon: 'history', title: '15+ Years of Industry Experience', description: 'Strong track record built through long-term service delivery and operational consistency since 2009.', number: '01' },
  { icon: 'domain', title: 'Multi-Industry Presence', description: 'Active across Telecom, FMCG, Healthcare, and Corporate sectors with adaptable service models.', number: '02' },
  { icon: 'public', title: 'Pan India Operations', description: 'Transport and supply capability across India for both recurring and large-scale requirements.', number: '03' },
  { icon: 'handshake', title: 'Trusted by Reputed Organizations', description: 'Reliable partner for leading brands, enterprises, and institutions.', number: '04' },
  { icon: 'task_alt', title: 'Commitment to Quality', description: 'Focused on reliability, service quality, and timeline adherence in every assignment.', number: '05' },
  { icon: 'local_shipping', title: 'Integrated Solutions', description: 'One partner for mobility, transport, and multi-category supply support.', number: '06' }
];

export const TIMELINE: TimelineItem[] = [
  { year: '2009', title: 'Nikita Travel Started', description: 'Operations began with focused transport services and local mobility support.', icon: 'flag' },
  { year: '2015', title: 'Service Expansion', description: 'Cab and bus service operations expanded with stronger B2B and contractual engagements.', icon: 'trending_up' },
  { year: '2020', title: 'Diversification', description: 'Added supply and service solutions including grocery, beverages, stationery, and FMCG.', icon: 'inventory_2' },
  { year: '2026', title: 'Pan India Nikita Traders', description: 'Rebranded and operating as Nikita Traders with integrated transport and nationwide supply capabilities.', icon: 'public' }
];

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
  role: 'Owner & Director',
  summary:
    'Bharat Kumar provides strategic leadership to Nikita Traders, driving dependable transport operations, Pan India supply execution, and long-term client value. His direction has transformed the company from a transport-focused business into a trusted multi-sector service partner known for quality and reliability.',
  image: 'bharat-kumar.png',
  imageAlt: 'Bharat Kumar, Owner and Director of Nikita Traders'
};

export const ORGANIZATION_LEADS: OrganizationLead[] = [
  {
    icon: 'engineering',
    title: 'Subham Kumar Gupta',
    role: 'Head - Operations / Management',
    focus: 'Service operations, deployment, and execution quality'
  },
  {
    icon: 'manage_accounts',
    title: 'Manish Kumar',
    role: 'Department Head',
    focus: 'Department coordination and delivery timelines'
  }
];
