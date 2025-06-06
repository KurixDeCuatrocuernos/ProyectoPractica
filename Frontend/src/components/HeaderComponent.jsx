import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import '../styles/HeaderComponent.css'
import logo from '../assets/LogoAndresEscudero2.jpeg'
import textsEs from '../assets/es.json'
import textsEn from '../assets/en.json'
import LoginForm from './LoginFormComponent.jsx'
import spain from '../assets/SpainFlag.png'
import uk from '../assets/UnitedKingdomFlag.png'
import { useLanguage } from '../context/LanguageContext';
import { redirect } from 'react-router-dom'

function HeaderComponent() {

    const[flag, setFlag] = useState(spain);
    const { language, toggleLanguage, currentTexts } = useLanguage();
    const navigate = useNavigate();
    const [showServices, setShowServices] = useState(false);

    const setLanguage = async() => {
        toggleLanguage();
        if (flag===spain) {
            setFlag(uk);    
        } else {
            setFlag(spain);
        }
          
    } 

    const redirectTo = async(uri) => {
        useEffect((
            navigate(uri)
        ),[]);
    }

    return (
        <div id='header_header'>
            <div id='header_row'>
                <img id='header_logo_img' src={logo} alt="Logo Andrés Escudero" onClick={() => navigate("/home")}/>
                <div id='header_div_buttons'>
                    <p className='header_navbar_button' onClick={() => navigate("/about_us")}>{currentTexts.headerComponent.button1}</p>
                    <p className='header_navbar_button' onClick={() => navigate("/contact")}>{currentTexts.headerComponent.button2}</p>
                    <div id="header_navbar_div_sections" onMouseEnter={() => setShowServices(true)} onMouseLeave={() => setShowServices(false)}>
                        <p id="header_navbar_sectionsButton" className='header_navbar_button' >{currentTexts.headerComponent.button3}</p>
                        <div id="header_navbar_dropdown">
                            {/*Aquí están los elementos del desplegable*/}
                            {showServices && <p className='header_navbar_list_element'>{currentTexts.headerComponent.dropdown1}</p>}
                            {showServices && <p className='header_navbar_list_element'>{currentTexts.headerComponent.dropdown2}</p>} 
                        </div>
                    </div>
                </div>
                <img id='header_language_img' src={flag} alt='country language flag' onClick={setLanguage}/>
                <LoginForm/>
            </div>
        </div>
    )
}

export default HeaderComponent