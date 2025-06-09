import ServiceComponent from '../components/ServiceComponent'
import '../styles/LaboralPage.css'
import image1 from '../assets/upAnDownSocialSecurityImage.jpg'
import image2 from '../assets/notificationSocialSecurityImage.jpg'
import image3 from '../assets/priceImage.jpg'
import image4 from '../assets/rosterConfectionImage.jpg'
import image5 from '../assets/certificationImage.jpg'
import image6 from '../assets/contractsImage.jpg'
import image7 from '../assets/medicalImage.png'
import { useLanguage } from '../context/LanguageContext'
import NavComponent from '../components/NavComponent'
import ContactComponent from '../components/ContactComponent'

function LaboralPage() {

    const {currentTexts} = useLanguage();

    return (
        <div id="laboralPage_container">
            <NavComponent text={currentTexts.navComponent.laboralPageText}/>

            <h1 id="laboralPage_title">{currentTexts.laboralPage.title}</h1>
            <ServiceComponent image={image1} text={currentTexts.laboralPage.subtitle1} orientation={"row"} redirection={""}/>
            <ServiceComponent image={image2} text={currentTexts.laboralPage.subtitle2} orientation={"row-reverse"} redirection={""}/>
            <ServiceComponent image={image3} text={currentTexts.laboralPage.subtitle3} orientation={"row"} redirection={""}/>
            <ServiceComponent image={image4} text={currentTexts.laboralPage.subtitle4} orientation={"row-reverse"} redirection={""}/>
            <ServiceComponent image={image5} text={currentTexts.laboralPage.subtitle5} orientation={"row"} redirection={""}/>
            <ServiceComponent image={image6} text={currentTexts.laboralPage.subtitle6} orientation={"row-reverse"} redirection={""}/>
            <ServiceComponent image={image7} text={currentTexts.laboralPage.subtitle7} orientation={"row"} redirection={""}/>
            
            <ContactComponent/>
        </div>
    )
}

export default LaboralPage