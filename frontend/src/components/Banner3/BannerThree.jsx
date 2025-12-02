import React from 'react'
import './BannerThree.css'

import Home from '../../assets/Videos/YVI.mp4'
import About from '../../assets/Videos/About.mp4'
import Contact from '../../assets/Videos/Contact.mp4'
import MobileAppDevelopment from '../../assets/Videos/Mobile_App_Development.mp4'
import AIData from '../../assets/Videos/AI_and_Data_Platform.mp4'
import OracleFinancials from '../../assets/Videos/Oracle_Financials.mp4'
import OracleHCM from '../../assets/Videos/Oracle_HCM.mp4'
import OracleSCM from '../../assets/Videos/Oracle_SCM.mp4'
import OtherOracleStreams from '../../assets/Videos/Other_Oracle_Streams.mp4'
import RPAServices from '../../assets/Videos/RPA_Services.mp4'
import UiUxDesign from '../../assets/Videos/ui-ux-design.mp4'
import WebDevelopment from '../../assets/Videos/Web_Development.mp4'
import ManagedServices from '../../assets/Videos/managedservices.mp4'
import Salesforce from '../../assets/Videos/Salesforce.mp4'
import SAP from '../../assets/Videos/SAP.mp4'

import HomePoster from '../../assets/Videos/YVI.png'
import AboutPoster from '../../assets/Videos/About.png'
import ContactPoster from '../../assets/Videos/Contact.png'
import MobileAppPoster from '../../assets/Videos/Mobile_App_Development.png'
import AIDataPoster from '../../assets/Videos/AI_and_Data_Platform.png'
import OracleFinancialsPoster from '../../assets/Videos/Oracle_Financials.png'
import OracleHCMPoster from '../../assets/Videos/Oracle_HCM.png'
import OracleSCMPoster from '../../assets/Videos/Oracle_SCM.png'
import OtherOracleStreamsPoster from '../../assets/Videos/Other_Oracle_Streams.png'
import RPAServicesPoster from '../../assets/Videos/RPA_Services.png'
import UiUxPoster from '../../assets/Videos/ui-ux-design.png'
import WebDevPoster from '../../assets/Videos/Web_Development.png'

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
  'SAP.mp4': {video: SAP , poster: OracleHCMPoster }
  
}

const BannerThree = ({ headingText, content, videoName }) => {
  const asset = videoAssets[videoName]

  return (
    <div className="banner" style={{
        backgroundImage: `url(${asset?.poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <video 
        src={asset?.video} 
        autoPlay 
        loop 
        muted 
        poster={asset?.poster} 
      />
      <div className="video-overlay" />
      <div className="contentt">
        <h2>{headingText}</h2>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default BannerThree