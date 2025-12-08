export interface SubPrompt {
  id: string;
  text: string;
}

export interface Category {
  id: string;
  icon: string;
  title: string;
  prompts: SubPrompt[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'about',
    icon: '🏢',
    title: 'About YVI',
    prompts: [
      { id: 'about-1', text: 'Company overview and mission' },
      { id: 'about-2', text: 'Leadership team and expertise' },
      { id: 'about-3', text: 'Years of industry experience' },
      { id: 'about-4', text: 'Core values and approach' },
      { id: 'about-5', text: 'Global presence and locations' },
      { id: 'about-6', text: 'Recent achievements and milestones' }
    ]
  },
  {
    id: 'services',
    icon: '🛠',
    title: 'Our Services',
    prompts: [
      { id: 'services-1', text: 'Complete service portfolio' },
      { id: 'services-2', text: 'Custom software development' },
      { id: 'services-3', text: 'Enterprise system integration' },
      { id: 'services-4', text: 'Digital transformation consulting' },
      { id: 'services-5', text: 'Ongoing maintenance and support' },
      { id: 'services-6', text: 'Staff augmentation services' }
    ]
  },
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI & Automation',
    prompts: [
      { id: 'ai-1', text: 'Machine learning solutions' },
      { id: 'ai-2', text: 'Process automation capabilities' },
      { id: 'ai-3', text: 'Data analytics and insights' },
      { id: 'ai-4', text: 'Predictive modeling services' },
      { id: 'ai-5', text: 'Natural language processing' },
      { id: 'ai-6', text: 'Computer vision applications' }
    ]
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud & DevOps',
    prompts: [
      { id: 'cloud-1', text: 'Cloud migration strategies' },
      { id: 'cloud-2', text: 'Multi-cloud management' },
      { id: 'cloud-3', text: 'CI/CD pipeline setup' },
      { id: 'cloud-4', text: 'Infrastructure as code' },
      { id: 'cloud-5', text: 'Container orchestration' },
      { id: 'cloud-6', text: 'Security and compliance' }
    ]
  },
  {
    id: 'contact',
    icon: '📞',
    title: 'Contact Us',
    prompts: [
      { id: 'contact-1', text: 'Sales and partnership inquiries' },
      { id: 'contact-2', text: 'Support and technical assistance' },
      { id: 'contact-3', text: 'Career opportunities' },
      { id: 'contact-4', text: 'Request a consultation' },
      { id: 'contact-5', text: 'Office locations and hours' },
      { id: 'contact-6', text: 'Emergency contact procedures' }
    ]
  }
];

export const MORE_CATEGORIES: Category[] = [
  {
    id: 'erp',
    icon: '🧾',
    title: 'ERP Solutions',
    prompts: [
      { id: 'erp-1', text: 'Oracle implementation services' },
      { id: 'erp-2', text: 'SAP module customization' },
      { id: 'erp-3', text: 'Legacy system modernization' },
      { id: 'erp-4', text: 'Supply chain optimization' },
      { id: 'erp-5', text: 'Financial system integration' },
      { id: 'erp-6', text: 'HR and payroll solutions' }
    ]
  },
  {
    id: 'cases',
    icon: '💼',
    title: 'Case Studies',
    prompts: [
      { id: 'cases-1', text: 'Industry success stories' },
      { id: 'cases-2', text: 'ROI improvement examples' },
      { id: 'cases-3', text: 'Complex challenge solutions' },
      { id: 'cases-4', text: 'Client testimonials' },
      { id: 'cases-5', text: 'Innovation showcases' },
      { id: 'cases-6', text: 'Before and after results' }
    ]
  },
  {
    id: 'pricing',
    icon: '📊',
    title: 'Pricing Models',
    prompts: [
      { id: 'pricing-1', text: 'Project-based pricing' },
      { id: 'pricing-2', text: 'Time and materials' },
      { id: 'pricing-3', text: 'Dedicated team models' },
      { id: 'pricing-4', text: 'Retainer agreements' },
      { id: 'pricing-5', text: 'SLA and guarantee terms' },
      { id: 'pricing-6', text: 'Budget planning assistance' }
    ]
  },
  {
    id: 'tech',
    icon: '🧠',
    title: 'Technologies',
    prompts: [
      { id: 'tech-1', text: 'Frontend technologies used' },
      { id: 'tech-2', text: 'Backend and database stack' },
      { id: 'tech-3', text: 'Mobile development frameworks' },
      { id: 'tech-4', text: 'Emerging tech adoption' },
      { id: 'tech-5', text: 'Integration capabilities' },
      { id: 'tech-6', text: 'Security protocols' }
    ]
  },
  {
    id: 'domains',
    icon: '🧩',
    title: 'Industries',
    prompts: [
      { id: 'domains-1', text: 'Manufacturing solutions' },
      { id: 'domains-2', text: 'Healthcare innovations' },
      { id: 'domains-3', text: 'Financial services' },
      { id: 'domains-4', text: 'Retail and e-commerce' },
      { id: 'domains-5', text: 'Logistics and supply chain' },
      { id: 'domains-6', text: 'Public sector services' }
    ]
  }
];