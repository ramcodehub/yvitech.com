// Script to populate sample data into the knowledge base
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

async function populateKnowledgeBase() {
  try {
    console.log('Populating knowledge base with sample data...');
    
    // Initialize Supabase client
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Sample knowledge base entries
    const knowledgeEntries = [
      {
        category: 'Services',
        title: 'IT Consulting',
        keywords: ['IT', 'consulting', 'digital', 'transformation', 'strategy'],
        description: 'Our experts help develop and implement effective IT strategies, assist in smooth digital transformation and system integration, and advise on improvements to your digital customer experience.'
      },
      {
        category: 'Services',
        title: 'Enterprise Solutions',
        keywords: ['enterprise', 'Oracle', 'SAP', 'Salesforce', 'HCM', 'SCM', 'Financials'],
        description: 'Comprehensive enterprise solutions including Oracle HCM, Oracle SCM, Oracle Financials, SAP, and Salesforce implementations and support.'
      },
      {
        category: 'Services',
        title: 'Data and AI Solutions',
        keywords: ['data', 'AI', 'analytics', 'machine learning', 'platform'],
        description: 'We specialize in optimizing data management processes and transforming existing systems into advanced, next-generation data platforms. Our solutions facilitate the consolidation of monitoring activities and provide significant value through a self-service console for data access, analytics, management, and optimization.'
      },
      {
        category: 'Services',
        title: 'RPA Services',
        keywords: ['RPA', 'automation', 'robotic', 'process'],
        description: 'Robotic Process Automation services to streamline business processes and improve operational efficiency.'
      },
      {
        category: 'Services',
        title: 'Web and Mobile Development',
        keywords: ['web', 'mobile', 'development', 'application', 'design'],
        description: 'Custom web and mobile application development with modern technologies and best practices.'
      },
      {
        category: 'Services',
        title: 'UX/UI Design',
        keywords: ['UX', 'UI', 'design', 'user experience', 'user interface'],
        description: 'Specialized in user experience and user interface design for websites, SaaS platforms, and web/mobile applications.'
      },
      {
        category: 'Company',
        title: 'About YVI Tech',
        keywords: ['about', 'company', 'mission', 'vision'],
        description: 'YVI Tech was founded by a dedicated team of technology and business professionals with backgrounds from reputable organizations. Our team possesses extensive experience and specialized expertise in consulting, enabling us to offer strategic guidance to organizations aimed at optimizing technology investments, managing business risks, and enhancing return on investment (ROI).'
      },
      {
        category: 'Company',
        title: 'Our Approach',
        keywords: ['approach', 'methodology', 'process'],
        description: 'Our customer-first approach is the main motto which made us to come up with blended services that would cater all our customer requirements with a long-lasting satisfaction.'
      },
      {
        category: 'Services',
        title: 'Complete Portfolio of YVI Technologies Services',
        keywords: ['services', 'portfolio', 'offerings', 'complete', 'all services', 'full range'],
        description: 'YVI Technologies offers a comprehensive portfolio of IT services including: 1) Enterprise Solutions (Oracle HCM, Oracle SCM, Oracle Financials, SAP, Salesforce), 2) Managed Services, 3) Data and AI Solutions, 4) RPA Services, 5) Digital Marketing, 6) UX/UI Design, 7) Web and Mobile Development, 8) Cloud & DevOps Solutions, 9) IT Consulting & Digital Transformation. Our services span across multiple domains to support digital transformation and business growth.'
      },
      {
        category: 'Services',
        title: 'Enterprise Solutions',
        keywords: ['enterprise', 'Oracle', 'SAP', 'Salesforce', 'HCM', 'SCM', 'Financials', 'ERP'],
        description: 'Comprehensive enterprise solutions including Oracle HCM, Oracle SCM, Oracle Financials, SAP, and Salesforce implementations and support. We provide end-to-end solutions for enterprise resource planning and business process optimization.'
      },
      {
        category: 'Services',
        title: 'AI and Data Solutions',
        keywords: ['AI', 'data', 'analytics', 'artificial intelligence', 'machine learning', 'platform'],
        description: 'Advanced AI and data solutions to help businesses leverage their data assets. Our services include AI implementation, machine learning models, data analytics, business intelligence, and predictive analytics to drive informed decision-making.'
      },
      {
        category: 'Services',
        title: 'Web and Mobile Development',
        keywords: ['web', 'mobile', 'development', 'application', 'software', 'website'],
        description: 'Custom web and mobile application development using modern technologies. We build scalable, secure, and user-friendly applications tailored to your business needs, from concept to deployment and maintenance.'
      },
      {
        category: 'Services',
        title: 'Digital Marketing',
        keywords: ['marketing', 'digital', 'SEO', 'social media', 'advertising', 'campaign'],
        description: 'Comprehensive digital marketing services including SEO, SEM, social media marketing, content marketing, and online advertising to help grow your online presence and reach your target audience effectively.'
      }
    ];
    
    console.log(`Inserting ${knowledgeEntries.length} knowledge base entries...`);
    
    // Insert entries
    const { data, error } = await supabase
      .from('chatbot_knowledge')
      .insert(knowledgeEntries)
      .select();
      
    if (error) {
      console.log('⚠️  Error inserting knowledge base entries:', error.message);
    } else {
      console.log('✅ Successfully inserted knowledge base entries');
      console.log('Inserted', data.length, 'entries');
    }
    
    console.log('\n✅ Knowledge base population completed!');
    
  } catch (error) {
    console.error('❌ Knowledge base population failed:', error.message);
  }
}

// Run the script
populateKnowledgeBase();