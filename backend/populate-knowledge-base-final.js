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
    
    // Clear existing data first
    await supabase
      .from('chatbot_knowledge')
      .delete()
      .gt('id', '00000000-0000-0000-0000-000000000000');
    
    // Sample knowledge base entries - focusing on titles and descriptions with keywords
    const knowledgeEntries = [
      {
        category: 'Services',
        title: 'IT Consulting Services',
        description: 'Our experts help develop and implement effective IT strategies, assist in smooth digital transformation and system integration, and advise on improvements to your digital customer experience. We provide comprehensive IT consulting services for digital transformation.'
      },
      {
        category: 'Services',
        title: 'Enterprise Solutions Oracle SAP Salesforce',
        description: 'Comprehensive enterprise solutions including Oracle HCM, Oracle SCM, Oracle Financials, SAP, and Salesforce implementations and support. We provide end-to-end solutions for enterprise resource planning and business process optimization.'
      },
      {
        category: 'Services',
        title: 'Data and AI Solutions',
        description: 'We specialize in optimizing data management processes and transforming existing systems into advanced, next-generation data platforms. Our solutions facilitate the consolidation of monitoring activities and provide significant value through a self-service console for data access, analytics, management, and optimization. Advanced AI and data solutions to help businesses leverage their data assets.'
      },
      {
        category: 'Services',
        title: 'RPA Services Robotic Process Automation',
        description: 'Robotic Process Automation services to streamline business processes and improve operational efficiency. We provide RPA services to automate repetitive tasks and enhance business operations.'
      },
      {
        category: 'Services',
        title: 'Web and Mobile Development Applications',
        description: 'Custom web and mobile application development with modern technologies and best practices. We build scalable, secure, and user-friendly applications tailored to your business needs, from concept to deployment and maintenance.'
      },
      {
        category: 'Services',
        title: 'UX UI Design User Experience Interface',
        description: 'Specialized in user experience and user interface design for websites, SaaS platforms, and web/mobile applications. We create intuitive and engaging user experiences for digital products.'
      },
      {
        category: 'Company',
        title: 'About YVI Tech Company Information',
        description: 'YVI Tech was founded by a dedicated team of technology and business professionals with backgrounds from reputable organizations. Our team possesses extensive experience and specialized expertise in consulting, enabling us to offer strategic guidance to organizations aimed at optimizing technology investments, managing business risks, and enhancing return on investment (ROI).'
      },
      {
        category: 'Company',
        title: 'Our Approach Methodology Process',
        description: 'Our customer-first approach is the main motto which made us to come up with blended services that would cater all our customer requirements with a long-lasting satisfaction.'
      },
      {
        category: 'Services',
        title: 'Complete Portfolio of YVI Technologies Services All Services Offerings Full Range',
        description: 'YVI Technologies offers a comprehensive portfolio of IT services including: 1) Enterprise Solutions (Oracle HCM, Oracle SCM, Oracle Financials, SAP, Salesforce), 2) Managed Services, 3) Data and AI Solutions, 4) RPA Services, 5) Digital Marketing, 6) UX/UI Design, 7) Web and Mobile Development, 8) Cloud & DevOps Solutions, 9) IT Consulting & Digital Transformation. Our services span across multiple domains to support digital transformation and business growth. This represents our complete portfolio of services, all services, and full range of offerings.'
      },
      {
        category: 'Services',
        title: 'All YVI Technologies Services Portfolio Complete List',
        description: 'Complete list of all services offered by YVI Technologies: Enterprise Solutions (Oracle HCM, SCM, Financials), SAP, Salesforce, Managed Services, Data and AI Solutions, RPA, Digital Marketing, UX/UI Design, Web and Mobile Development, Cloud & DevOps, IT Consulting. This represents our full service portfolio and complete range of offerings.'
      },
      {
        category: 'Services',
        title: 'Full Service Portfolio YVI Technologies Complete Range',
        description: 'YVI Technologies provides the complete portfolio of IT services: Enterprise Solutions, Managed Services, Data and AI Solutions, RPA Services, Digital Marketing, UX/UI Design, Web and Mobile Development, Cloud & DevOps Solutions, and IT Consulting. This is our full range of service offerings.'
      },
      {
        category: 'Services',
        title: 'AI and Data Solutions Artificial Intelligence Machine Learning',
        description: 'Advanced AI and data solutions to help businesses leverage their data assets. Our services include AI implementation, machine learning models, data analytics, business intelligence, and predictive analytics to drive informed decision-making.'
      },
      {
        category: 'Services',
        title: 'Digital Marketing SEO Social Media Advertising Campaign',
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
    
    console.log('\n✅ Knowledge base cleared and re-populated!');
    
  } catch (error) {
    console.error('❌ Knowledge base population failed:', error.message);
  }
}

// Run the script
populateKnowledgeBase();