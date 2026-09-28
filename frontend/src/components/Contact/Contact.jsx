import React from 'react'
import Video from '../Video/Video'
import Info_Form from '../Contact Info & Form/Info_Form'
import BannerHero from '../BannerHero/BannerHero'

const Contact = () => {
  return (
    <div>
      <BannerHero headingText='Our team is ready to help'
                  highlightText='Innovate and Collaborate!'
              content="Receive customized solutions, professional guidance, and accurate estimates."
              videoName="Contact.mp4"/>
      <Video/>
      <Info_Form/>
    </div>
  )
}

export default Contact
