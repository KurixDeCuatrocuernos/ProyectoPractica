import '../styles/ContactComponent.css'
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

function ContactComponent() {

    const { currentTexts } = useLanguage();
    const navigate = useNavigate();

    return(
        <div id="contact_container">
            <h2 id="contact_ask">{currentTexts.contactComponent.questionText}</h2>
            <h2 id="contact_text">{currentTexts.contactComponent.text}</h2>
            <button id="contact_button" onClick={() => navigate("/contact")}>{currentTexts.contactComponent.buttonText}</button>
        </div>
    );
}
export default ContactComponent;