import React, { useRef, useState } from 'react'
import './BannerThree.css'

import Home from '/src/assets/Videos/home1.mp4'
import About from '/src/assets/Videos/about_us1.mp4'
import Contact from '/src/assets/Videos/Contact.mp4'
import MobileAppDevelopment from '/src/assets/Videos/Mobile_App_Development.mp4'
import AIData from '/src/assets/Videos/AI_and_Data_Platform.mp4'
import OracleFinancials from '/src/assets/Videos/Oracle_Financials.mp4'
import OracleHCM from '/src/assets/Videos/Oracle_HCM.mp4'
import OracleSCM from '/src/assets/Videos/Oracle_SCM.mp4'
import OtherOracleStreams from '/src/assets/Videos/Other_Oracle_Streams1.mp4'
import RPAServices from '/src/assets/Videos/RPA_Services1.mp4'
import UiUxDesign from '/src/assets/Videos/ui-ux-design.mp4'
import WebDevelopment from '/src/assets/Videos/Web_Development.mp4'
import ManagedServices from '/src/assets/Videos/managedservices.mp4'
import Salesforce from '/src/assets/Videos/Salesforce.mp4'
import SAP from '/src/assets/Videos/SAP.mp4'
import CyberServices from '/src/assets/Videos/cyberbanner.mp4'
import CyberResilience from '/src/assets/Videos/CyberResilience.mp4'

import HomePoster from '/src/assets/Videos/YVI.png'
import AboutPoster from '/src/assets/Videos/About.png'
import ContactPoster from '/src/assets/Videos/Contact.png'
import MobileAppPoster from '/src/assets/Videos/Mobile_App_Development.png'
import AIDataPoster from '/src/assets/Videos/AI_and_Data_Platform.png'
import OracleFinancialsPoster from '/src/assets/Videos/Oracle_Financials.png'
import OracleHCMPoster from '/src/assets/Videos/Oracle_HCM.png'
import OracleSCMPoster from '/src/assets/Videos/Oracle_SCM.png'
import OtherOracleStreamsPoster from '/src/assets/Videos/Other_Oracle_Streams1_poster.png'
import RPAServicesPoster from '/src/assets/Videos/RPA_Services_poster.png'
import UiUxPoster from '/src/assets/Videos/ui-ux-design.png'
import WebDevPoster from '/src/assets/Videos/Web_Development.png'
import CyberPoster from '/src/assets/Videos/cyberbanner.png'

const videoAssets = {
  'YVI.mp4': { video: Home, poster: HomePoster },
  'About.mp4': { video: About, poster: AboutPoster },
  'Contact.mp4': { video: Contact, poster: ContactPoster },
  'Mobile_App_Development.mp4': { video: MobileAppDevelopment, poster: MobileAppPoster },
  'AI_and_Data_Platform.mp4': { video: AIData, poster: AIDataPoster },
  'Oracle_Financials.mp4': { video: OracleFinancials, poster: OracleFinancialsPoster },
  'Oracle_HCM.mp4': { video: OracleHCM, poster: OracleHCMPoster },
  'Oracle_SCM.mp4': { video: OracleSCM, poster: OracleSCMPoster },
  'Other_Oracle_Streams.mp4': { video: OtherOracleStreams, poster: OtherOracleStreamsPoster },
  'RPA_Services.mp4': { video: RPAServices, poster: RPAServicesPoster },
  'ui-ux-design.mp4': { video: UiUxDesign, poster: UiUxPoster },
  'Web_Development.mp4': { video: WebDevelopment, poster: WebDevPoster },
  'managedservices.mp4': {video: ManagedServices , poster: OracleHCMPoster },
  'Salesforce.mp4': {video: Salesforce , poster: OracleHCMPoster },
  'SAP.mp4': {video: SAP , poster: OracleHCMPoster },
  'CyberSecurityServices.mp4': {video: CyberServices , poster: OracleHCMPoster },
  'CyberResilience.mp4': { video: CyberResilience, poster: CyberPoster }
  
}

const BannerThree = ({ headingText, content, videoName, showMuteButton = false, className = '' }) => {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const asset = videoAssets[videoName]

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  return (
    <div className={`banner ${className}`.trim()} style={{
        backgroundImage: `url(${asset?.poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <video 
        ref={videoRef}
        src={asset?.video}
        autoPlay 
        loop 
        muted 
        defaultMuted
        poster={asset?.poster} 
      />
      <div className="video-overlay" />
      {showMuteButton && (
        <button
          className="banner-mute-button"
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
            title={isMuted ? "Unmute video" : "Mute video"}
        >
            <i className={`bi ${isMuted ? "bi-volume-mute-fill" : "bi-volume-up-fill"}`} aria-hidden="true" />
        </button>
      )}
      <div className="contentt">
        <h2>{headingText}</h2>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default BannerThree