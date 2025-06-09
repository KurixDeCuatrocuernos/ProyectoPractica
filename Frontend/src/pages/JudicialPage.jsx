import ServiceComponent from '../components/ServiceComponent'
import '../styles/JudicialPage.css'
import judgement from '../assets/mazoImage.jpg'
import tomb from '../assets/testamentImage.jpg'
import inheritance from '../assets/inheritanceImage.jpg'
import rent from '../assets/rentImage.jpg'
import home from '../assets/homeImage.jpg'
import invest from '../assets/inversionImage.jpg'
import build from '../assets/buildImage.jpg'
import divorce from '../assets/divorceImage.jpg'
import { useLanguage } from '../context/LanguageContext'
import NavComponent from '../components/NavComponent'
import ContactComponent from '../components/ContactComponent'

function JudicialPage() {

    const { currentTexts } = useLanguage();

    const redirectToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return(
        <div id="judicialPage_container">
            <NavComponent text={currentTexts.navComponent.judicialPageText}/>

            <h1 id="judicialPage_title">{currentTexts.judicialPage.title}</h1>
            <div id="judicialPage_indexContainer">
                <ul id="judicialPage_list"> {/*Lista de servicios*/}
                    <li className='judicialPage_list_element' onClick={() => redirectToSection('judicialPage_inheritanceSection')}>{currentTexts.judicialPage.inheritanceTitle}</li> 
                    <li className='judicialPage_list_element' onClick={() => redirectToSection('judicialPage_contractSection')}>{currentTexts.judicialPage.homeContractsTitle}</li>
                    <li className='judicialPage_list_element' onClick={() => redirectToSection('judicialPage_divorceSection')}>{currentTexts.judicialPage.divorcesTitle}</li>
                    {/*<li>Juicos Penales</li>*/}
                    {/*<li>Procesos Mercantiles</li>*/}
                    {/*<li>Contratos Civiles</li>*/}
                </ul>
                <img id="judicialPage_img" src={judgement} alt="Judge's gavel image from unsplash" />
            </div>
            <div className='judicialPage_blueLine'/> {/*línea azul*/}
            <h2 id='judicialPage_inheritanceSection' className='judicialPage_section_title'>{currentTexts.judicialPage.inheritanceTitle}</h2>
            <ServiceComponent image={tomb} text={currentTexts.judicialPage.subtitle1} orientation={"row"} redirection={""}/>
            <ServiceComponent image={inheritance} text={currentTexts.judicialPage.subtitle2} orientation={"row-reverse"} redirection={""}/>
            <div className='judicialPage_blueLine'/>
            <h2 id='judicialPage_contractSection' className='judicialPage_section_title'>{currentTexts.judicialPage.homeContractsTitle}</h2>
            <ServiceComponent image={rent} text={currentTexts.judicialPage.subtitle3} orientation={"row"} redirection={""}/>
            <ServiceComponent image={home} text={currentTexts.judicialPage.subtitle4} orientation={"row-reverse"} redirection={""}/>
            <ServiceComponent image={invest} text={currentTexts.judicialPage.subtitle5} orientation={"row"} redirection={""}/>
            <ServiceComponent image={build} text={currentTexts.judicialPage.subtitle6} orientation={"row-reverse"} redirection={""}/>
            <div className='judicialPage_blueLine'/>
            <h2 id='judicialPage_divorceSection' className='judicialPage_section_title'>{currentTexts.judicialPage.divorcesTitle}</h2>
            <ServiceComponent image={divorce} text={currentTexts.judicialPage.subtitle7} orientation={"row"} redirection={""}/>

            <ContactComponent/>
        </div>
    )
}

export default JudicialPage