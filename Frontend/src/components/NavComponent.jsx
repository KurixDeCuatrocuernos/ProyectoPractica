import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/NavComponent.css'

function NavComponent({ text }) {

    const {currentTexts} = useLanguage();
    const navigate = useNavigate();

    return(
        <div id="navComponent_container">
            <h2 id="navComponent_askText">{text}</h2>
            <button id="navComponent_button" onClick={() => navigate("/contact")}>{currentTexts.navComponent.button}</button>
        </div>
    );
}

export default NavComponent