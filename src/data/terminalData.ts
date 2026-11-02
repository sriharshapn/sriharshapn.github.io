export interface TerminalCommandStep {
  command: string;
  output: string[];
}

export const terminalIntroSequence: TerminalCommandStep[] = [
  {
    command: 'whoami',
    output: ['Sri Harsha Penugondla Nagaraja'],
  },
  {
    command: 'role',
    output: ['AI/ML Engineering Student'],
  },
  {
    command: 'education',
    output: [
      'B.E. Artificial Intelligence and Machine Learning',
      'BMS College of Engineering, Bengaluru',
    ],
  },
  {
    command: 'interests',
    output: [
      'Artificial Intelligence',
      'Machine Learning',
      'Computer Vision',
      'Backend Engineering',
      'Full-Stack Development',
    ],
  },
  {
    command: 'current_focus',
    output: [
      'Building intelligent systems',
      'Exploring emerging technologies',
      'Solving real-world problems',
    ],
  },
  {
    command: 'status',
    output: ['Always learning. Always building.'],
  },
];

export interface InteractiveCommandHelp {
  name: string;
  description: string;
}

export const availableInteractiveCommands: InteractiveCommandHelp[] = [
  { name: 'whoami', description: 'Display personal identity' },
  { name: 'role', description: 'Current engineering role & specialization' },
  { name: 'education', description: 'Degree and academic institution' },
  { name: 'interests', description: 'Core technical interests and domains' },
  { name: 'current_focus', description: 'Active priorities and engineering goals' },
  { name: 'status', description: 'Engineering mindset statement' },
  { name: 'about', description: 'Read brief biographical summary' },
  { name: 'skills', description: 'View technical skills overview' },
  { name: 'projects', description: 'Scroll to Featured Projects' },
  { name: 'contact', description: 'Scroll to Contact information' },
  { name: 'clear', description: 'Clear terminal screen' },
  { name: 'replay', description: 'Replay auto-typing introduction' },
  { name: 'help', description: 'List all available terminal commands' },
];
