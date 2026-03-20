export type ProjectCategory = 'Mechatronics' | 'IoT' | 'Research';

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  highlights: string[];
  links?: Array<{ label: string; href: string }>;
};

export const projects: Project[] = [
  {
    slug: 'robotic-arm-bluetooth-gripper',
    title: 'Robotic Arm (Bluetooth Gripper)',
    category: 'Mechatronics',
    summary:
      'A lightweight gripping robotic arm controlled via a mobile app over Bluetooth.',
    highlights: [
      'Grip lightweight objects safely',
      'Mobile control via Bluetooth',
      'Mechatronics + embedded integration'
    ]
  },
  {
    slug: 'three-doof-robotic-arm',
    title: '3-DOF Robotic Arm',
    category: 'Mechatronics',
    summary: 'A compact 3-DOF robotic arm platform for motion control and experimentation.',
    highlights: ['Motion control', 'Kinematics-focused design', 'Teaching-friendly platform']
  },
  {
    slug: 'biped-walking-robot',
    title: 'Biped Walking Robot',
    category: 'Mechatronics',
    summary: 'A robot that mimics human gait using biomimicry-inspired locomotion ideas.',
    highlights: ['Human gait inspiration', 'Walking stability focus', 'Real-world robotics learning']
  },
  {
    slug: 'hexapod',
    title: 'Hexapod (Insect Terrain Traversal)',
    category: 'Mechatronics',
    summary: 'Biomimicry of insects that can traverse rocky terrain.',
    highlights: ['Legged locomotion', 'Terrain traversal', 'Bio-inspired control']
  },
  {
    slug: 'industrial-sorting-plc',
    title: 'Industrial Sorting Machine (PLC)',
    category: 'IoT',
    summary: 'Detect objects and place them in the correct location using an industrial sorting workflow.',
    highlights: ['Object detection pipeline', 'PLC-based control', 'Production-style automation']
  },
  {
    slug: 'automatic-parking-system',
    title: 'Automatic Parking System (IoT)',
    category: 'IoT',
    summary: 'An IoT parking system that monitors vehicles and supports automated management.',
    highlights: ['IoT monitoring', 'Vehicle counting', 'Practical automation systems']
  },
  {
    slug: 'rppg-face-alignment-heart-rate',
    title: 'rPPG Heart Rate (Face Alignment)',
    category: 'Research',
    summary: 'Evaluating how face alignment affects video-based non-contact heart rate measurement (rPPG).',
    highlights: [
      'Remote photoplethysmography (rPPG)',
      'Face alignment impact study',
      'Simplification potential with minimal accuracy loss'
    ],
    links: [
      {
        label: 'Thesis link',
        href: 'https://thesis.lib.ncku.edu.tw/thesis/detail/49edac76fafa11340d83f0739143e992/'
      }
    ]
  }
];

