import React from 'react'
import image5 from '../../../assets/img/microsofttech.png'
import image1 from '../../../assets/img/microsoftdynamics.png'
import ImageTextSection from '../Components/ImageTextSection/ImageTextSection'
import MicrosoftDynamicsComponent from '../Components/MicrosoftDynamicsComponent/MicrosoftDynamicsComponent'
import Applications from '../Applications/Applications'
import { applicationsConfig } from '../../../data/applicationsconfig'
import { corecyberservices } from '../../../data/corecyberservices'
import CyberServices from '../Components/CyberServices/CyberServices'


const MicrosoftDynamics = () => {
  return (
    <div>
      <div className='container' style={{ marginTop: '140px' }}>
        <ImageTextSection
            image={image5}
            heading="Microsoft Technologies"
            description="We deliver scalable and secure solutions built on the Microsoft ecosystem, helping organizations modernize applications, optimize data, and accelerate digital transformation."
            points={[
                "Azure Cloud & Azure DevOps",
                "Analytics & Visualization with Power BI",
                ".NET Core, SharePoint & Microsoft 365",
                "SQL Server Integration & Reporting Services"
            ]}
            imageLeft={true}
            />

        <ImageTextSection
            image={image1}
            heading="Microsoft Dynamics 365"
            description="Our Dynamics 365 expertise enables businesses to streamline operations, enhance customer engagement, and gain real-time insights across finance, sales, and core processes."
            points={[
                "Dynamics 365 Sales",
                "Dynamics 365 Finance",
                "Dynamics 365 Business Central"
            ]}
            />
            <Applications Application={applicationsConfig.props.Application} />
            <CyberServices Services={corecyberservices.props.Services} />
      </div>

            <MicrosoftDynamicsComponent/>

    </div>
  )
}

export default MicrosoftDynamics
