import { useLanguage } from '../context/LanguageContext'
import '../styles/ContactPage.css'

function ContactPage() {

    const {currentTexts} = useLanguage();

    return(
        <div id="contactPage_container">
            <h1 id="contactPage_title">{currentTexts.contactPage.title}</h1>
            <form id="contactPage_form">
                <div id="contactPage_inputLine1">
                    <div className='contactPage_inputDiv'>
                        <input className="contactPage_inputElement" type='text' placeholder={currentTexts.contactPage.namePlaceholder}/>
                        <p className='contactPage_form_helpText'>{currentTexts.contactPage.nameHintText}</p>
                    </div>
                    <div className='contactPage_inputDiv'>
                        <input className="contactPage_inputElement" type='text' placeholder={currentTexts.contactPage.surnamePlaceholder}/>
                        <p className='contactPage_form_helpText'>{currentTexts.contactPage.surnameHintText}</p> 
                    </div>
                </div>
                <div id="contactPage_inputLine2">
                    <div className="contactPage_inputDiv">
                        <input className="contactPage_inputElement" type='text' placeholder={currentTexts.contactPage.emailPlaceholder}/>
                        <p className='contactPage_form_helpText'>{currentTexts.contactPage.emailHintText}</p>
                    </div>
                    <div className="contactPage_inputDiv">
                        <input className="contactPage_inputElement" type='text' placeholder={currentTexts.contactPage.phonePlaceholder}/>
                        <p className='contactPage_form_helpText'>{currentTexts.contactPage.phoneHintText}</p>                
                    </div>
                </div>
                    <div className="contactPage_inputDiv">
                        <input id="contactPage_inputArea" type="textarea" placeholder={currentTexts.contactPage.textareaPlaceholder}/>
                        <p className='contactPage_form_helpText'>{currentTexts.contactPage.textareaHintText}</p>
                    </div>
                <div id="contactPage_button" onClick={() => console.log("Has pulsado aceptar")}>
                    <div id="contactPage_leftButton"></div>
                    <button id="contactPage_submitButton">{currentTexts.contactPage.submitButton}</button>
                    <div id="contactPage_rightButton"></div>
                </div>

            </form>
            <p className='contactPage_form_helpText'>{currentTexts.contactPage.privacyText}</p>
            <h1 id="contactPage_phoneMessage">{currentTexts.contactPage.phoneHelpText}</h1>
        </div>
    )
} 
export default ContactPage