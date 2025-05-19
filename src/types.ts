export const TECHNOLOGIES = [
  'JavaScript',
  'TypeScript',
  'React',
  'Vue',
  'Angular',
  'Node.js',
  'Express',
  'Next.js',
  'Nuxt.js',
  'Svelte',
  'Python',
  'Django',
  'Flask',
  'Ruby',
  'Ruby on Rails',
  'PHP',
  'Laravel',
  'Java',
  'Spring',
  'C#',
  '.NET',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'Flutter',
  'React Native',
  'HTML',
  'CSS',
  'Sass',
  'Tailwind CSS',
  'Bootstrap',
  'Material UI',
  'GraphQL',
  'REST API',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'Firebase',
  'AWS',
  'Azure',
  'Google Cloud',
  'Docker',
  'Kubernetes',
  'CI/CD',
  'Git',
  'GitHub',
  'GitLab',
  'Bitbucket',
  'Jira',
  'Figma',
  'Sketch',
  'Adobe XD',
  'Photoshop',
  'Illustrator'
];

export const CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Data Science',
  'Machine Learning',
  'Artificial Intelligence',
  'DevOps',
  'Cloud Computing',
  'Blockchain',
  'Game Development',
  'IoT',
  'Cybersecurity',
  'E-commerce',
  'Social Media',
  'Education',
  'Healthcare',
  'Finance',
  'Entertainment'
];

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  repoUrl: string;
  categories: string[];
  technologies: string[];
  createdAt: string;
}
