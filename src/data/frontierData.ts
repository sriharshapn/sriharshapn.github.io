import { 
  personalInfo, 
  featuredProjects, 
  academicProjects, 
  skillCategories, 
  eventItems,
  type FeaturedProject,
  type AcademicProject,
  type SkillCategory,
  type EventItem
} from './portfolioData';

export type FrontierSectionId = 
  | 'map' 
  | 'journal' 
  | 'arsenal' 
  | 'mission-board' 
  | 'chronicles' 
  | 'journey' 
  | 'saloon';

export interface FrontierLocation {
  id: FrontierSectionId;
  name: string;
  tagline: string;
  region: string;
  iconName: string;
  coordinates: { x: number; y: number }; // percentage on map canvas
  description: string;
  badge: string;
}

export const FRONTIER_LOCATIONS: FrontierLocation[] = [
  {
    id: 'journal',
    name: 'Valentine',
    tagline: 'The Journal',
    region: 'The Heartlands',
    iconName: 'book-open',
    coordinates: { x: 28, y: 34 },
    description: 'Field notes, personal philosophy, engineering background & education at BMSCE.',
    badge: 'About & Identity'
  },
  {
    id: 'arsenal',
    name: 'Saint Denis',
    tagline: 'The Arsenal',
    region: 'Lemoyne Territory',
    iconName: 'crosshair',
    coordinates: { x: 80, y: 68 },
    description: 'Tools of the trade: Python, C, React, Computer Vision, OCR, and system architectures.',
    badge: 'Technical Arsenal'
  },
  {
    id: 'mission-board',
    name: 'Blackwater',
    tagline: 'The Mission Board',
    region: 'West Elizabeth',
    iconName: 'scroll',
    coordinates: { x: 38, y: 74 },
    description: 'Featured bounties & project dossiers: PaarakhMetric, KisanSathi, Jan Sathi, and simulations.',
    badge: 'Featured Work'
  },
  {
    id: 'chronicles',
    name: 'Strawberry',
    tagline: 'The Chronicles',
    region: 'Big Valley',
    iconName: 'newspaper',
    coordinates: { x: 18, y: 55 },
    description: 'Frontier dispatches, Smart India Hackathon, Google Cloud Build with AI, and verified certificates.',
    badge: 'Dispatches & Certs'
  },
  {
    id: 'journey',
    name: 'Horseshoe Overlook',
    tagline: 'The Journey',
    region: 'New Hanover',
    iconName: 'compass',
    coordinates: { x: 50, y: 38 },
    description: 'The unfolding trail: from foundational C programming to AI vision pipelines and hackathons.',
    badge: 'Frontier Trail'
  },
  {
    id: 'saloon',
    name: 'Van Horn',
    tagline: 'The Saloon',
    region: 'Roanoke Ridge',
    iconName: 'message-square',
    coordinates: { x: 78, y: 26 },
    description: 'Where trails cross. Inquire on contracts, collaborations, and professional links.',
    badge: 'Telegraph & Contact'
  }
];

export interface TrailMilestone {
  period: string;
  title: string;
  locationName: string;
  description: string;
  skills: string[];
  type: 'education' | 'hackathon' | 'systems' | 'research';
}

export const FRONTIER_TRAIL: TrailMilestone[] = [
  {
    period: '2023 — Present',
    title: 'B.E. in Artificial Intelligence & Machine Learning',
    locationName: 'BMS College of Engineering, Bengaluru',
    description: 'Pursuing engineering degree focusing on core computational theory, linear algebra, algorithms, deep learning architectures, and system design.',
    skills: ['Mathematics', 'AI Theory', 'Algorithms', 'Data Structures'],
    type: 'education'
  },
  {
    period: 'Foundations',
    title: 'Systems Programming & Mathematical Mechanics',
    locationName: 'Academic Exploration & Research',
    description: 'Built computational physics engines (Artemis II Orbit Simulation, Two-Body Problem Verlet Integrator) and robust memory-managed utilities in pure C.',
    skills: ['C', 'Python', 'NumPy', 'Physics Simulation', 'Numerical Methods'],
    type: 'systems'
  },
  {
    period: 'Full-Stack & Cloud',
    title: 'Practical Software Engineering & Real-World Deployments',
    locationName: 'Application Architecture',
    description: 'Engineered robust client-server platforms: Udupu (inventory engine with Google Sheets/Apps Script sync) and College Event Manager (PostgreSQL with dynamic QR scanner).',
    skills: ['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Vite'],
    type: 'systems'
  },
  {
    period: 'March 2026',
    title: 'The Beginner Hackathon — Jan Sathi Civic Triage',
    locationName: 'Protocol Club, Department of CSE, BMSCE',
    description: 'Engineered an AI-powered civic incident reporting system in a high-intensity 3-hour development sprint. Integrated Gemini API for automated severity triage and verified routing.',
    skills: ['Next.js', 'TypeScript', 'Gemini AI', 'Tailwind CSS', 'API Routes'],
    type: 'hackathon'
  },
  {
    period: '2026',
    title: 'Google Cloud — Build with AI 2.0 (Agriculture Track)',
    locationName: 'National AI Community Sprint',
    description: 'Developed KisanSathi backend services integrating Earth Engine vegetation analytics, Open-Meteo agronomic intelligence, and Gemini crop diagnostics.',
    skills: ['Node.js', 'Firestore', 'Gemini API', 'Earth Engine', 'REST APIs'],
    type: 'hackathon'
  },
  {
    period: '2026',
    title: 'Smart India Hackathon (SIH26034) — PaarakhMetric',
    locationName: 'Ministry of Education / AICTE',
    description: 'Collaborative development of an automated Legal Metrology label compliance scanner. Built computer vision pipelines with OCR extraction, Gemini Vision analysis, and offline-first syncing.',
    skills: ['Computer Vision', 'FastAPI', 'Gemini Vision', 'PaddleOCR', 'React'],
    type: 'research'
  }
];

export {
  personalInfo,
  featuredProjects,
  academicProjects,
  skillCategories,
  eventItems,
  type FeaturedProject,
  type AcademicProject,
  type SkillCategory,
  type EventItem
};
