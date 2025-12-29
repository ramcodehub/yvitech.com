export interface SubPrompt {
  id: string;
  text: string; // UI label
  fullPrompt?: string; // Full backend prompt
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

// Centralized mapping layer for UI labels to full backend prompts
export const PROMPT_INTENT_MAPPING: Record<string, string> = {
  // About YVI
  'Company overview and mission': 'What is the company overview and mission of YVI Technologies?',
  'Leadership team and expertise': 'Who leads YVI Technologies and what expertise does the leadership team have?',
  'Years of industry experience': 'How many years of industry experience does YVI Technologies have?',
  'Core values and approach': 'What are the core values and working approach of YVI Technologies?',
  'Global presence and locations': 'What is the global presence and office locations of YVI Technologies?',
  'Recent achievements and milestones': 'What recent achievements and milestones has YVI Technologies accomplished?',

  // Our Services
  'Complete service portfolio': 'What services are included in the complete portfolio of YVI Technologies?',
  'Custom software development': 'Does YVI Technologies provide custom software development services?',
  'Enterprise system integration': 'How does YVI Technologies handle enterprise system integration?',
  'Digital transformation consulting': 'What digital transformation consulting services does YVI Technologies offer?',
  'Ongoing maintenance and support': 'What ongoing maintenance and support services are provided by YVI Technologies?',
  'Staff augmentation services': 'Does YVI Technologies offer staff augmentation and dedicated resource services?',

  // AI & Automation
  'Machine learning solutions': 'What machine learning solutions does YVI Technologies provide?',
  'Process automation capabilities': 'What process automation capabilities are offered by YVI Technologies?',
  'Data analytics and insights': 'What data analytics and insights services does YVI Technologies provide?',
  'Predictive modeling services': 'Does YVI Technologies offer predictive modeling services?',
  'Natural language processing': 'What natural language processing solutions does YVI Technologies deliver?',
  'Computer vision applications': 'Does YVI Technologies provide computer vision application development?',

  // Cloud & DevOps
  'Cloud migration strategies': 'What cloud migration strategies does YVI Technologies follow?',
  'Multi-cloud management': 'Does YVI Technologies support multi-cloud management solutions?',
  'CI/CD pipeline setup': 'How does YVI Technologies implement CI/CD pipeline solutions?',
  'Infrastructure as code': 'What infrastructure-as-code practices are used by YVI Technologies?',
  'Container orchestration': 'Does YVI Technologies provide container orchestration using Kubernetes or Docker?',
  'Security and compliance': 'How does YVI Technologies ensure cloud security and compliance?',

  // Contact Us
  'Sales and partnership inquiries': 'How can I contact YVI Technologies for sales or partnership inquiries?',
  'Support and technical assistance': 'How do I get technical support from YVI Technologies?',
  'Career opportunities': 'Are there career opportunities available at YVI Technologies?',
  'Request a consultation': 'How can I request a consultation with YVI Technologies?',
  'Office locations and hours': 'What are the office locations and working hours of YVI Technologies?',
  'Emergency contact procedures': 'What are the emergency contact procedures at YVI Technologies?',

  // ERP Solutions
  'Oracle implementation services': 'What Oracle implementation services does YVI Technologies offer?',
  'SAP module customization': 'Does YVI Technologies provide SAP module customization services?',
  'Legacy system modernization': 'How does YVI Technologies modernize legacy ERP systems?',
  'Supply chain optimization': 'Does YVI Technologies provide supply chain optimization solutions?',
  'Financial system integration': 'How does YVI Technologies integrate financial systems?',
  'HR and payroll solutions': 'What HR and payroll solutions does YVI Technologies deliver?',

  // Case Studies
  'Industry success stories': 'Can you share industry success stories from YVI Technologies?',
  'ROI improvement examples': 'How has YVI Technologies helped clients improve ROI?',
  'Complex challenge solutions': 'What complex challenges has YVI Technologies successfully solved?',
  'Client testimonials': 'Are there client testimonials for YVI Technologies?',
  'Innovation showcases': 'Can you showcase innovative solutions delivered by YVI Technologies?',
  'Before and after results': 'What before-and-after results has YVI Technologies achieved for clients?',

  // Pricing Models
  'Project-based pricing': 'Does YVI Technologies offer project-based pricing models?',
  'Time and materials': 'Does YVI Technologies follow time-and-materials pricing?',
  'Dedicated team models': 'What dedicated team engagement models does YVI Technologies offer?',
  'Retainer agreements': 'Are retainer-based service agreements available at YVI Technologies?',
  'SLA and guarantee terms': 'What SLA and guarantee terms does YVI Technologies provide?',
  'Budget planning assistance': 'Does YVI Technologies help with IT budget planning?',

  // Technologies
  'Frontend technologies used': 'What frontend technologies are used by YVI Technologies?',
  'Backend and database stack': 'What backend and database technologies does YVI Technologies use?',
  'Mobile development frameworks': 'Which mobile app development frameworks does YVI Technologies support?',
  'Emerging tech adoption': 'What emerging technologies are adopted by YVI Technologies?',
  'Integration capabilities': 'What system integration capabilities does YVI Technologies have?',
  'Security protocols': 'What security protocols and best practices does YVI Technologies follow?',

  // Industries
  'Manufacturing solutions': 'What solutions does YVI Technologies offer for manufacturing industries?',
  'Healthcare innovations': 'What healthcare technology solutions does YVI Technologies provide?',
  'Financial services': 'How does YVI Technologies support financial services organizations?',
  'Retail and e-commerce': 'What retail and e-commerce solutions does YVI Technologies deliver?',
  'Logistics and supply chain': 'What logistics and supply chain solutions does YVI Technologies provide?',
  'Public sector services': 'Does YVI Technologies work with public sector and government clients?',
};

// Function to get the full prompt for a UI label
export const getFullPrompt = (uiLabel: string): string => {
  return PROMPT_INTENT_MAPPING[uiLabel] || `Can you explain ${uiLabel} `;
};

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