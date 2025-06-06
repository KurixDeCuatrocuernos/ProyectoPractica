import '../styles/LoginFormComponent.css'
import { useLanguage } from '../context/LanguageContext';

function LoginFormComponent() {

    const { currentTexts } = useLanguage();

    return(
        <form id='LoginForm_form'>
            <div id='LoginForm_div_fields'>
                <input className='LoginForm_fields_input' type="text" placeholder={currentTexts.loginFormComponent.inputEmail}/>
                <input className='LoginForm_fields_input' type="password" placeholder={currentTexts.loginFormComponent.inputPassword}/>
            </div>
            <button id='LoginForm_Submit_button'>
                {currentTexts.loginFormComponent.submitButton}
            </button>
        </form>
    );
}

export default LoginFormComponent;