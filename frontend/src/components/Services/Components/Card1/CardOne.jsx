import React from 'react'
import Industry_Gov from '/src/assets/img/Services-icons/Industries_Government.jpg'
import HealthCare from '/src/assets/img/Services-icons/healthcare.webp'
import Retail from '/src/assets/img/Services-icons/retail.webp'
import Financial from '/src/assets/img/Services-icons/Financial.webp'
import Manufacturing from '/src/assets/img/Services-icons/manufacturing.jpg'
import SCM_CBF from '/src/assets/img/SCM_CBF.png'
import SCM_Analytics from '/src/assets/img/SCM-Analytics.jpg'
import OracleCloudInfra from '/src/assets/img/OracleCloudInfra.jpeg'
import CompleteFinancialMgmt from '/src/assets/img/CompleteFinancialMgmt.jpg'
import AdvancedFinancialAnalytics from '/src/assets/img/AdvancedFinancialAnalytics.jpg'
import RealtimeAnalytics from '/src/assets/img/RealtimeAnalytics.jpg'
import OraFinAutoEff from '/src/assets/img/OraFinAutoEff.jpg'
import OracleFCRM from '/src/assets/img/Oracle-Fusion-Cloud-Risk-Management.jpg'
import OraclePPMO from '/src/assets/img/OraclePPMO.png'
import OracleEPMCloud from '/src/assets/img/OracleEPMCloud.jpg'
import OracleMarketingCloud from '/src/assets/img/OracleMarketingCloud.jpeg'
import OracleSalesCloud from '/src/assets/img/OracleSalesCloud.jpeg'
import OracleServiceCloud from '/src/assets/img/OracleServiceCloud.jpeg'
import Data_Ingestion from '/src/assets/img/Data_Ingestion.jpg'
import DataStorage from '/src/assets/img/DataStorage.jpg'
import DataTransformation from '/src/assets/img/DataTransformation.png'
import DataModelling from '/src/assets/img/DataModelling.jpg'
import DataMigration from '/src/assets/img/DataMigration.jpg'
import DataOrchestration from '/src/assets/img/DataOrchestration.jpg'
import MachineLearningApplications from '/src/assets/img/machine-learning-applications.jpg'
import BusinessIntelligence from '/src/assets/img/BusinessIntelligence.jpeg'
import AutomatedReporting from '/src/assets/img/Automated-Reporting.jpg'
import AIAssistants from '/src/assets/img/AI-Assistants.png'
import DocumentSummarization from '/src/assets/img/Document-Summarization.jpg'
import LLMEvaluation from '/src/assets/img/LLMEvaluation.png'
import RAGApplications from '/src/assets/img/RAGApplications.jpg'
import ToolAugmentedChatbots from '/src/assets/img/ToolAugmentedChatbots.jpeg'
import AgenticAI from '/src/assets/img/AgenticAI.png'
import RPAOperationalCost from '/src/assets/img/RPAOperationalCost.jpeg'
import RPACustomerService from '/src/assets/img/RPA-in-Customer-Service.png'
import RPAScalability from '/src/assets/img/RPAScalability.jpg'
import ResearchUIUX from '/src/assets/img/ResearchUIUX.png'
import UXDataVisualization from '/src/assets/img/UXDataVisualization.jpg'
import UIUXConsulting from '/src/assets/img/UIUX-consulting.jpg'
import UXAudit from '/src/assets/img/UXAudit.jpg'
import UserExperienceTesting from '/src/assets/img/UserExperienceTesting.jpg'
import MAD_1 from '/src/assets/img/MAD_1.jpg'
import MAD_2 from '/src/assets/img/MAD_2.jpg'
import MAD_3 from '/src/assets/img/MAD_3.jpg'
import MAD_4 from '/src/assets/img/MAD_4.jpg'
import MobileAppModernization from '/src/assets/img/MobileAppModernization.jpg'
import MAD_6 from '/src/assets/img/MAD_6.jpg'
import AIGeneratedContentDevelopment from '/src/assets/img/AIGeneratedContentDevelopment.jpg'
import PersonalizedMarketingStrategies from '/src/assets/img/PersonalizedMarketingStrategies.jpg'
import PredictiveAnalyticsandCampaignPlanning from '/src/assets/img/PredictiveAnalyticsandCampaignPlanning.jpg'
import AutomatedSearchEngineOptimization from '/src/assets/img/AutomatedSearchEngineOptimization.jpg'
import CreativeAssetProduction from '/src/assets/img/CreativeAssetProduction.jpg'
import ExpertiseInGenerativeAI from '/src/assets/img/ExpertiseInGenerativeAI.jpg'
import CommitmentToInnovation from '/src/assets/img/CommitmentToInnovation.jpg'
import ScalableSolutions from '/src/assets/img/ScalableSolutions.jpg'
import DataDrivenApproach from '/src/assets/img/DataDrivenApproach.jpg'


const CardOne = ({image,headingText,content,dataAOS,classname,height=true}) => {
    const images={
        'Industry_Gov.jpg' : Industry_Gov,
        'HealthCare.webp' : HealthCare,
        'retail.webp' : Retail,
        'Financial.webp' : Financial,
        'Manufacturing.jpg' : Manufacturing,
        'SCM_CBF.png' : SCM_CBF,
        'SCM_Analytics.jpg' : SCM_Analytics,
        'OracleCloudInfra.jpeg' : OracleCloudInfra,
        'CompleteFinancialMgmt.jpg' : CompleteFinancialMgmt,
        'AdvancedFinancialAnalytics.jpg' : AdvancedFinancialAnalytics,
        'RealtimeAnalytics.jpg' : RealtimeAnalytics,
        'OraFinAutoEff.jpg' : OraFinAutoEff,
        'OracleFCRM.jpg' : OracleFCRM,
        'OraclePPMO.png' : OraclePPMO,
        'OracleEPMCloud.jpg' : OracleEPMCloud,
        'OracleMarketingCloud.jpeg' : OracleMarketingCloud,
        'OracleSalesCloud.jpeg' : OracleSalesCloud,
        'OracleServiceCloud.jpeg' : OracleServiceCloud,
        'Data_Ingestion.jpg': Data_Ingestion,
        'DataStorage.jpg': DataStorage,
        'DataTransformation.png': DataTransformation,
        'DataModelling.jpg': DataModelling,
        'DataMigration.jpg': DataMigration,
        'DataOrchestration.jpg': DataOrchestration,
        'MachineLearningApplications.jpg': MachineLearningApplications,
        'BusinessIntelligence.jpeg': BusinessIntelligence,
        'Automated-Reporting.jpg': AutomatedReporting,
        'AI-Assistants.png': AIAssistants,
        'Document-Summarization.jpg': DocumentSummarization,
        'LLMEvaluation.png': LLMEvaluation,
        'RAGApplications.jpg': RAGApplications,
        'ToolAugmentedChatbots.jpeg': ToolAugmentedChatbots,
        'AgenticAI.png': AgenticAI,
        'RPAOperationalCost.jpeg': RPAOperationalCost,
        'RPA-in-Customer-Service.png': RPACustomerService,
        'RPAScalability.jpg': RPAScalability,
        'ResearchUIUX.png': ResearchUIUX,
        'UXDataVisualization.jpg': UXDataVisualization,
        'UIUX-consulting.jpg': UIUXConsulting,
        'UXAudit.jpg': UXAudit,
        'UserExperienceTesting.jpg': UserExperienceTesting,
        'MAD_1.jpg': MAD_1,
        'MAD_2.jpg': MAD_2,
        'MAD_3.jpg': MAD_3,
        'MAD_4.jpg': MAD_4,
        'MobileAppModernization.jpg': MobileAppModernization,
        'MAD_6.jpg': MAD_6,
        'AIGeneratedContentDevelopment.jpg': AIGeneratedContentDevelopment,
        'PersonalizedMarketingStrategies.jpg': PersonalizedMarketingStrategies,
        'PredictiveAnalyticsandCampaignPlanning.jpg': PredictiveAnalyticsandCampaignPlanning,
        'AutomatedSearchEngineOptimization.jpg': AutomatedSearchEngineOptimization,
        'CreativeAssetProduction.jpg': CreativeAssetProduction,
        'ExpertiseInGenerativeAI.jpg': ExpertiseInGenerativeAI,
        'CommitmentToInnovation.jpg': CommitmentToInnovation,
        'ScalableSolutions.jpg': ScalableSolutions,
        'DataDrivenApproach.jpg': DataDrivenApproach
    }  
  return (
    
      <div className={`col-xl-${classname||4} col-md-6 d-flex aos-init aos-animate`} data-aos="zoom-out"  data-aos-delay={dataAOS||0}>
            <div className="service-item position-relative bg_white_light">
              <div> <img src={images[image]} className="img-fluid" alt="" style={ height ? { width: "356px", height: "200px" } : {} }/></div>
              <h4><span className="stretched-link">{headingText}</span></h4>
              <p>
                {content}
              </p>

            </div>
          </div>
    
  )
}

export default CardOne
