import React from 'react'
import { Link } from 'react-router-dom'
import RPAOperationalCost from '/src/assets/img/RPAOperationalCost.jpeg'
import SCM_Analytics from '/src/assets/img/SCM-Analytics.jpg'
import SCM_CBF from '/src/assets/img/SCM_CBF.png'
import RPAScalability from '/src/assets/img/RPAScalability.jpg'
import RPA_CustomerService from '/src/assets/img/RPA-in-Customer-Service.png'
import RPAAll_Industries from '/src/assets/img/RPAAll_Industries.jpeg'
import RequestImage from '/src/assets/img/request-image.webp'
import styles from './RPAServicesStandalone.module.css'

const RPAServicesStandalone = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className={styles.banner_section}>
        <div className={styles.banner_container}>
          <video width="100%" height="auto" controls>
            <source src="/src/assets/Videos/RPA_Services.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.video_overlay}></div>
          <div className={styles.banner_content}>
            <h1>Robotic Process Automation (RPA) Services. Empowering Businesses with Smart Automation Solutions</h1>
            <p>At YVI Tech, we specialize in providing advanced Robotic Process Automation (RPA) solutions that optimize operations, increase productivity, and support innovation. Our RPA services are tailored to assist your organization in automating repetitive, manual tasks, enabling your team to concentrate on strategic initiatives that promote growth and efficiency.</p>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className={styles.featured_services}>
        <div className={styles.container}>
          <div className={styles.section_title}>
            <h2>Robotic Process Automation (RPA)</h2>
            <p>Why RPA?</p>
          </div>

          <div className={styles.values}>
            <div className={`${styles.container} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up">          
              <div className={styles.row}>
                <div className={`${styles.col_lg_12} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up" data-aos-delay="200">
                  <div className={styles.box}>
                    <p className={styles.imp_msg}>Robotic Process Automation is transforming the way industries operate. By integrating RPA into your business processes, you can:</p>                  
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.row} ${styles.gap_4}`}>
            {/* Card 1 - Reduce Operational Costs */}
            <div className={`${styles.col_xl_4} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up" data-aos-delay="0">
              <div className={`${styles.service_item} ${styles.bg_white_light}`}>
                <div className={styles.card_image}>
                  <img src={RPAOperationalCost} className={styles.img_fluid} alt="Reduce Operational Costs" style={{ width: "356px", height: "200px" }} />
                </div>
                <h4><span className={styles.stretched_link}>Reduce Operational Costs</span></h4>
                <p>Automate routine tasks to enhance efficiency and reduce reliance on manual labor, thereby significantly lowering operational costs.</p>
              </div>
            </div>

            {/* Card 2 - Enhance Accuracy */}
            <div className={`${styles.col_xl_4} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up" data-aos-delay="200">
              <div className={`${styles.service_item} ${styles.bg_white_light}`}>
                <div className={styles.card_image}>
                  <img src={SCM_Analytics} className={styles.img_fluid} alt="Enhance Accuracy" style={{ width: "356px", height: "200px" }} />
                </div>
                <h4><span className={styles.stretched_link}>Enhance Accuracy</span></h4>
                <p>Reduce the likelihood of human error by utilizing robotics to execute precise, repetitive tasks.</p>
              </div>
            </div>

            {/* Card 3 - Increase Productivity */}
            <div className={`${styles.col_xl_4} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up" data-aos-delay="400">
              <div className={`${styles.service_item} ${styles.bg_white_light}`}>
                <div className={styles.card_image}>
                  <img src={SCM_CBF} className={styles.img_fluid} alt="Increase Productivity" style={{ width: "356px", height: "200px" }} />
                </div>
                <h4><span className={styles.stretched_link}>Increase Productivity</span></h4>
                <p>Allow your employees to dedicate more time to value-added activities by reducing their involvement in routine tasks.</p>
              </div>
            </div>

            {/* Card 4 - Scalability */}
            <div className={`${styles.col_xl_4} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up" data-aos-delay="400">
              <div className={`${styles.service_item} ${styles.bg_white_light}`}>
                <div className={styles.card_image}>
                  <img src={RPAScalability} className={styles.img_fluid} alt="Scalability" style={{ width: "356px", height: "200px" }} />
                </div>
                <h4><span className={styles.stretched_link}>Scalability</span></h4>
                <p>Effortlessly adjust staffing levels in response to business needs without the necessity of recruiting additional personnel.</p>
              </div>
            </div>

            {/* Card 5 - Improve Customer Service */}
            <div className={`${styles.col_xl_4} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up" data-aos-delay="400">
              <div className={`${styles.service_item} ${styles.bg_white_light}`}>
                <div className={styles.card_image}>
                  <img src={RPA_CustomerService} className={styles.img_fluid} alt="Improve Customer Service" style={{ width: "356px", height: "200px" }} />
                </div>
                <h4><span className={styles.stretched_link}>Improve Customer Service</span></h4>
                <p>Enhance responsiveness and accuracy in addressing customer inquiries through the implementation of automated processes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our RPA Solutions Section */}
      <section className={styles.featured_services}>
        <div className={styles.container}>
          <div className={styles.section_title}>
            <h2>Our RPA Solutions</h2>
            <p>Include</p>
          </div>

          <div className={`${styles.row} ${styles.gap_4}`}>
            {/* Solution 1 - RPA Strategy and Consulting */}
            <div className={`${styles.col_xl_3} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up" data-aos-delay="0">
              <div className={`${styles.about_item} ${styles.box_border} ${styles.integ_bg1}`}>
                <h4><span className={styles.stretched_link}>RPA Strategy and Consulting</span></h4>
                <p>We assist you in identifying processes most suitable for automation, establishing well-defined RPA objectives, and developing a strategic roadmap for implementation and expansion.</p>
              </div>
            </div>

            {/* Solution 2 - RPA Implementation */}
            <div className={`${styles.col_xl_3} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up" data-aos-delay="0">
              <div className={`${styles.about_item} ${styles.box_border} ${styles.integ_bg1}`}>
                <h4><span className={styles.stretched_link}>RPA Implementation</span></h4>
                <p>Our specialists implement and configure RPA software to ensure seamless integration with your existing IT infrastructure while minimizing operational disruptions.</p>
              </div>
            </div>

            {/* Solution 3 - Custom RPA Development */}
            <div className={`${styles.col_xl_3} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up" data-aos-delay="0">
              <div className={`${styles.about_item} ${styles.box_border} ${styles.integ_bg1}`}>
                <h4><span className={styles.stretched_link}>Custom RPA Development</span></h4>
                <p>Customized automation solutions designed to meet your specific business requirements, utilizing UiPath, a leading Robotic Process Automation (RPA) platform.</p>
              </div>
            </div>

            {/* Solution 4 - Maintenance and Support */}
            <div className={`${styles.col_xl_3} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up" data-aos-delay="0">
              <div className={`${styles.about_item} ${styles.box_border} ${styles.integ_bg1}`}>
                <h4><span className={styles.stretched_link}>Maintenance and Support</span></h4>
                <p>Provision of continuous support and maintenance to ensure the optimal performance of your RPA solutions, including regular updates and enhancements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className={styles.featured_services}>
        <div className={styles.container}>
          <div className={styles.section_title}>
            <h2>OUR APPROACH IS INDUSTRY FIRST</h2>
            <p>Industries We Serve</p>
          </div>

          <div className={`${styles.row} ${styles.gap_4}`}>
            {/* Left Content with Image */}
            <div className={`${styles.col_xl_12} ${styles.col_md_6} ${styles.d_flex} ${styles.flex_wrap} ${styles.justify_content_between} ${styles.align_items_center} ${styles.bg_pink_light} ${styles.aos_init} ${styles.aos_animate} ${styles.px_xl_5} ${styles.p_5}`} data-aos="fade-up">
              <div className={`${styles.col_xl_6} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up">
                <div className={styles.about_item}>
                  <h4><span className={styles.stretched_link}>Industries We Serve</span></h4>
                  <p>Our RPA solutions passionately serve a diverse array of industries—finance, healthcare, manufacturing, retail, and beyond—dedicating ourselves to creating bespoke automation strategies that truly transform the way these fields overcome their unique challenges. We're driven by a unwavering commitment to empower each sector, unleashing new possibilities and inspiring breakthroughs that elevate their success to unprecedented heights.</p>
                </div>
              </div>
              <div className={`${styles.col_xl_5} ${styles.col_md_6} ${styles.d_flex} ${styles.aos_init} ${styles.aos_animate}`} data-aos="fade-up">
                <img src={RPAAll_Industries} className={styles.img_fluid} alt="Industries We Serve" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className={styles.contact_section}>
        <div className={`${styles.container} ${styles.bg_blue} ${styles.d_flex} ${styles.justify_content_between}`}>
          <div className={`${styles.col_xl_6} ${styles.col_md_6} ${styles.aos_init} ${styles.aos_animate} ${styles.align_items_center} ${styles.px_xl_5} ${styles.p_5}`} data-aos="fade-up">
            <h2>Start Your Automation Journey Today</h2>
            <p>Begin your automation journey with YVI Tech and enhance your business operations through our advanced RPA solutions. Please contact us to schedule a consultation and explore how we can help your organization become more efficient, innovative, and agile.</p>
            <Link to='/contact' className={styles.contact_link}>Get in Touch</Link>
          </div>
          <div className={`${styles.col_xl_4} ${styles.col_md_6} ${styles.aos_init} ${styles.aos_animate} ${styles.d_flex} ${styles.align_items_center} ${styles.justify_content_between}`}>
            <img src={RequestImage} className={styles.img_fluid} style={{ maxHeight: '300px' }} alt="Contact Us" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default RPAServicesStandalone