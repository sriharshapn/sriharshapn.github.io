export interface PersonalInfo {
  name: string;
  shortName: string;
  title: string;
  college: string;
  collegeShort: string;
  degree: string;
  heroSubtitle: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  aboutParagraphs: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface FeaturedProject {
  id: string;
  name: string;
  category: string;
  description: string;
  myRole: string;
  collaborative: boolean;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  eventBadge?: string;
  highlightNotice?: string;
  keyHighlights: string[];
}

export interface AcademicProject {
  id: string;
  name: string;
  category: string;
  type: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  context: string;
  highlights: string[];
}

export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  date?: string;
  track?: string;
  project?: string;
  description: string;
  statusBadge: string;
  certificateType?: 'local_modal' | 'external_url' | 'none';
  certificateUrl?: string;
  certificatePdfUrl?: string;
  certificateImageUrl?: string;
  certificateNotice?: string;
}

export const personalInfo: PersonalInfo = {
  name: "Sri Harsha Penugondla Nagaraja",
  shortName: "Sri Harsha",
  title: "AI/ML Engineering Student",
  college: "BMS College of Engineering (BMSCE), Bengaluru",
  collegeShort: "BMSCE, Bengaluru",
  degree: "B.E. Artificial Intelligence and Machine Learning",
  heroSubtitle: "Building intelligent systems and practical software solutions.",
  location: "Bengaluru, Karnataka, India",
  email: "sriharshapn@gmail.com",
  github: "https://github.com/sriharshapn",
  linkedin: "https://www.linkedin.com/in/sri-harsha-penugondla-nagaraja-663021239/",
  aboutParagraphs: [
    "I'm Sri Harsha Penugondla Nagaraja, an Artificial Intelligence and Machine Learning engineering student at BMS College of Engineering (BMSCE), Bengaluru.",
    "I'm passionate about building intelligent applications and exploring the intersection of AI, software engineering and real-world problem-solving.",
    "My experience spans backend and full-stack development, computer vision, OCR, AI-powered applications and simulation systems. Through hackathons, collaborative projects and academic work, I've had the opportunity to turn ideas into functional solutions while exploring different technologies and engineering approaches.",
    "I enjoy understanding systems beyond their surface level, experimenting with emerging technologies and continuously improving my technical skills."
  ]
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages used for systems programming, machine learning, and application logic.",
    icon: "code",
    skills: ["Python", "C", "JavaScript", "TypeScript"]
  },
  {
    title: "AI, ML and Computer Vision",
    description: "Models, visual perception pipelines, optical recognition, and generative AI integrations.",
    icon: "brain",
    skills: [
      "Machine Learning",
      "Computer Vision",
      "OpenCV",
      "PaddleOCR",
      "YOLO",
      "Gemini API",
      "Image Processing"
    ]
  },
  {
    title: "Frontend and Backend",
    description: "Full-stack web architectures, reactive client applications, and resilient server-side APIs.",
    icon: "layers",
    skills: [
      "React",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Node.js",
      "Express.js",
      "Next.js",
      "REST APIs"
    ]
  },
  {
    title: "Databases and Data",
    description: "Relational, document, and embedded storage solutions alongside scientific data computing.",
    icon: "database",
    skills: [
      "SQL",
      "SQLite",
      "Firebase",
      "Firestore",
      "PostgreSQL",
      "Pandas",
      "NumPy"
    ]
  },
  {
    title: "Tools and Technologies",
    description: "Development tooling, desktop runtimes, visualization libraries, and cloud platforms.",
    icon: "cpu",
    skills: [
      "Git",
      "GitHub",
      "Tauri",
      "ONNX",
      "Vercel",
      "Google Apps Script",
      "Google Sheets",
      "Three.js",
      "Electron",
      "Recharts"
    ]
  }
];

export const featuredProjects: FeaturedProject[] = [
  {
    id: "paarakhmetric",
    name: "PaarakhMetric",
    category: "AI / Computer Vision",
    description: "An AI-assisted Legal Metrology compliance inspection system designed to analyze packaged commodity labels and help identify compliance issues under the Legal Metrology (Packaged Commodities) Rules, 2011.",
    myRole: "AI, computer vision, OCR, image processing, segmentation, dataset and model-related development, and application development.",
    collaborative: true,
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Python",
      "FastAPI",
      "Gemini Vision",
      "Firebase",
      "Firestore",
      "IndexedDB"
    ],
    githubUrl: "https://github.com/Shreyas-M007/paarakhmetric",
    liveUrl: "https://shreyas-m007.github.io/paarakhmetric/",
    eventBadge: "Smart India Hackathon 2026 (SIH26034)",
    highlightNotice: "Collaborative Smart India Hackathon 2026 team project. Developed jointly with teammates.",
    keyHighlights: [
      "Computer vision pipeline for label detection and text region segmentation",
      "OCR extraction coupled with Gemini Vision multimodal inspection",
      "Rules-based verification against Legal Metrology (Packaged Commodities) Rules, 2011",
      "FastAPI backend and React frontend with offline-first IndexedDB and Firestore syncing"
    ]
  },
  {
    id: "kisansathi",
    name: "KisanSathi",
    category: "AI / Agriculture Technology",
    description: "An AI-powered agricultural assistance platform that brings together crop advisory, disease diagnosis, satellite-based vegetation insights, weather information and market-price data.",
    myRole: "Backend Development",
    collaborative: true,
    technologies: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Gemini API",
      "Firebase Authentication",
      "Cloud Firestore",
      "Google Earth Engine",
      "Open-Meteo"
    ],
    githubUrl: "https://github.com/sriharshapn/KisanSathi",
    liveUrl: "https://kisan-sathi-sirius.vercel.app",
    eventBadge: "Google Cloud — Build with AI: Code for Communities 2.0 (Agriculture Track)",
    highlightNotice: "Event participation in Google Cloud: Build with AI 2.0 (Agriculture Track). Results and certificates pending publication.",
    keyHighlights: [
      "Engineered backend REST endpoints in Node.js and Express.js",
      "Integrated Gemini API for agronomic disease diagnosis and advisory",
      "Incorporated Open-Meteo weather intelligence and Google Earth Engine satellite data",
      "Designed secure Firebase Auth token verification and Firestore document schemas"
    ]
  },
  {
    id: "jan-sathi",
    name: "Jan Sathi",
    category: "Civic Technology / AI",
    description: "A civic issue reporting and resolution platform developed during a three-hour hackathon sprint. Citizens can report civic problems using photographs and location information. An AI-based triage workflow classifies issues, estimates severity and routes them to the appropriate department dashboard.",
    myRole: "Backend Development",
    collaborative: true,
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Next.js API Routes",
      "Gemini API"
    ],
    githubUrl: "https://github.com/Shreyas-M007/Jan-Sathi",
    eventBadge: "The Beginner Hackathon (Protocol Club, BMSCE)",
    highlightNotice: "Built during a rapid 3-hour hackathon sprint at BMSCE, March 5, 2026.",
    keyHighlights: [
      "Constructed Next.js API route handlers for multimodal image and metadata intake",
      "Implemented Gemini AI automated triage pipeline to classify municipal issues",
      "Automated severity scoring and automated routing to municipal department queues",
      "Delivered a working prototype under tight 3-hour hackathon constraints"
    ]
  },
  {
    id: "drone-aero-lab",
    name: "Drone Aero Lab",
    category: "Simulation / Engineering",
    description: "A drone engineering and simulation platform dedicated to UAV design and aerodynamics concepts. Features DJI-referenced quadcopter component inventories (frames, motors, ESCs, batteries), thrust-to-weight modeling, and interactive 3D flight/aerodynamic visualization.",
    myRole: "Backend Development and Simulation",
    collaborative: true,
    technologies: [
      "JavaScript",
      "Three.js",
      "Electron",
      "esbuild"
    ],
    githubUrl: "https://github.com/Shreyas-M007/Drone-Aero-Lab",
    keyHighlights: [
      "Built component simulation modeling for frames, motors, ESCs, and batteries",
      "Implemented aerodynamic thrust-to-weight ratios and power consumption equations",
      "Contributed to Three.js 3D viewport and Electron runtime orchestration",
      "Engineered bundled desktop application build flow with esbuild"
    ]
  },
  {
    id: "udupu",
    name: "Udupu",
    category: "Full-Stack Development",
    description: "A clothing inventory and showcase management application with customer-facing product displays and an administrative dashboard for inventory, sales and business analytics.",
    myRole: "Full-Stack Development",
    collaborative: false,
    technologies: [
      "React",
      "Vite",
      "JavaScript",
      "Google Apps Script",
      "Google Sheets",
      "Google Drive",
      "Recharts"
    ],
    githubUrl: "https://github.com/sriharshapn/saree-godown-app",
    keyHighlights: [
      "Architected lightweight serverless backend using Google Apps Script and Google Sheets as structured storage",
      "Built responsive customer catalog with image storage integrated via Google Drive",
      "Developed comprehensive admin dashboard with sales tracking and Recharts visualizations",
      "Streamlined inventory tracking, stock adjustments, and product categorization"
    ]
  },
  {
    id: "college-event-manager",
    name: "College Event Manager",
    category: "Full-Stack Development",
    description: "A college event management system with student and administrator functionality, event creation, registrations, QR-based passes and attendance tracking.",
    myRole: "Full-Stack Development",
    collaborative: false,
    technologies: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "QR Code",
      "html5-qrcode"
    ],
    githubUrl: "https://github.com/sriharshapn/College-event-Manager",
    keyHighlights: [
      "Developed student portal for event browsing, capacity monitoring, and self-registration",
      "Built admin management panel for publishing events and overseeing seat capacities",
      "Implemented dynamic QR code pass generation upon confirmed registration",
      "Integrated in-browser QR scanning via html5-qrcode for instant attendance verification"
    ]
  }
];

export const academicProjects: AcademicProject[] = [
  {
    id: "artemis-ii",
    name: "Artemis II Orbit Simulation",
    category: "Computational Physics / Simulation",
    type: "Club Selection Assignment",
    description: "A physics-based orbital trajectory simulation modeling the Artemis II translunar path using Newtonian gravitation and numerical integration.",
    technologies: ["Python", "NumPy", "Matplotlib", "Physics Modeling"],
    githubUrl: "https://github.com/sriharshapn/artemis-ii-orbit-simulation",
    context: "Developed as a technical submission for aerospace/simulation club selection.",
    highlights: [
      "Newtonian gravitational equations governing Earth-Moon-spacecraft dynamics",
      "Numerical integration solver evaluating state vectors over time",
      "Trajectory mapping visualizer generating orbit profiles"
    ]
  },
  {
    id: "two-body-problem",
    name: "Two-Body Problem",
    category: "Astrodynamics / Numerical Methods",
    type: "Club Selection Assignment",
    description: "A Python-based gravitational simulation using Newton's law of gravitation and velocity-Verlet integration, featuring trajectory visualization and energy conservation diagnostics.",
    technologies: ["Python", "NumPy", "Matplotlib", "Numerical Integration"],
    githubUrl: "https://github.com/sriharshapn/two-body-problem",
    context: "Developed as a technical submission for technical club selection.",
    highlights: [
      "Implemented velocity-Verlet symplectic integrator for bounded numerical energy drift",
      "Calculated instantaneous potential, kinetic, and total system Hamiltonian",
      "Rendered orbital phase trajectories and energy error convergence plots"
    ]
  },
  {
    id: "c-travel-budget-planner",
    name: "C Travel Budget Planner",
    category: "Systems Programming / Financial Logic",
    type: "Academic Assessment of Additional Talent (AAT)",
    description: "A travel budget planning application developed in C for an academic Assessment of Additional Talent (AAT), supporting multi-currency conversions, categorized trip expenditure tracking, and automated budget constraint alerts.",
    technologies: ["C", "Standard Library", "Data Structures", "Financial Algorithms"],
    githubUrl: "https://github.com/sriharshapn/Presentation",
    context: "Authored as an academic Assessment of Additional Talent (AAT) project at BMSCE.",
    highlights: [
      "Engineered robust memory management and structured data records in pure C",
      "Implemented real-time multi-currency conversion calculation tables",
      "Built structured expense categorizer with threshold warnings and budget reports"
    ]
  }
];

export const eventItems: EventItem[] = [
  {
    id: "beginner-hackathon-2026",
    title: "The Beginner Hackathon",
    organizer: "Protocol Club, Department of CSE, BMSCE",
    date: "5 March 2026",
    project: "Jan Sathi",
    description: "Intensive 3-hour rapid development sprint hosted by Protocol Club at BMSCE. Built Jan Sathi, an AI-powered municipal issue reporting and automated triage system with image classification.",
    statusBadge: "Verified Certificate Issued",
    certificateType: "local_modal",
    certificatePdfUrl: "./certificates/the-beginner-hackathon-bmsce.pdf",
    certificateImageUrl: "./certificates/the-beginner-hackathon-bmsce.png",
    certificateNotice: "Awarded Certificate of Participation by Dr. Kavitha Sooda, Professor and Head, Department of CSE, BMSCE."
  },
  {
    id: "first-commit-bharat-builds",
    title: "First Commit — Bharat Builds Tour",
    organizer: "WeMakeDevs × AWS Builder Center",
    date: "2026",
    description: "Technical workshop and development initiative focused on modern cloud architecture, developer workflows, and foundational open-source contribution practices.",
    statusBadge: "Verified Credential",
    certificateType: "external_url",
    certificateUrl: "https://www.wemakedevs.org/certificates/QTPK27BST6",
    certificateNotice: "Verified credential issued via WeMakeDevs certification platform (Credential ID: QTPK27BST6)."
  },
  {
    id: "build-with-ai-communities-2",
    title: "Google Cloud — Build with AI: Code for Communities 2.0",
    organizer: "Hack2skill × Google Cloud",
    track: "Agriculture Track",
    project: "KisanSathi",
    description: "National AI community hackathon focused on developing high-impact generative AI and cloud solutions. Built KisanSathi, an integrated platform providing crop advisory, disease diagnosis, weather insights, and satellite vegetation monitoring.",
    statusBadge: "Participation • Results Pending",
    certificateType: "none",
    certificateNotice: "Event participation recorded in Agriculture Track. Certificates and competition results are pending official publication by organizers."
  },
  {
    id: "sih-2026",
    title: "Smart India Hackathon 2026",
    organizer: "Ministry of Education / AICTE",
    project: "PaarakhMetric (SIH26034)",
    description: "Collaborated on problem statement SIH26034 to create an AI-assisted Legal Metrology compliance inspection system analyzing packaged commodity labels under the Legal Metrology Rules, 2011.",
    statusBadge: "Collaborative Project Mention",
    certificateType: "none",
    certificateNotice: "Featured as a key collaborative technical project in portfolio. No individual certificate or award claimed."
  }
];
