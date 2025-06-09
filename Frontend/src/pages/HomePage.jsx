import { useLanguage } from '../context/LanguageContext';
import judicial from '../assets/JudicialPicture.jpg'
import laboral from '../assets/LaboralPicture.jpg'
import '../styles/HomePage.css'
import { useNavigate } from 'react-router-dom';
import NavComponent from '../components/NavComponent';
import ContactComponent from '../components/ContactComponent'

function HomePage (){

    const { currentTexts } = useLanguage();
    const navigate = useNavigate();

    // Todo funciona normal

    return (
        <div id="homePage_container">
            <NavComponent text={currentTexts.navComponent.homePageText}/>

            <h1 id="homePage_title_text">{currentTexts.homePage.titleText}</h1>
            <div id="homePage_judicial_row" onClick={() => navigate("/judicial_services")}>
                <img id="homePage_judicial_img" src={judicial} alt="Imagen de la Justicia tomada de Unsplash" />
                <p id="homePage_judicial_text" >{currentTexts.homePage.judicialText}</p>
            </div>
            <div id="homePage_laboral_row" onClick={() => navigate("/laboral_services")}>
                <img id="homePage_laboral_img" src={laboral} alt="Imagen de un Puerto tomada de Unsplash" />
                <p id="homePage_laboral_text" >{currentTexts.homePage.laboralText}</p>
            </div>
            
            <ContactComponent/>
        </div>
    );
}

export default HomePage