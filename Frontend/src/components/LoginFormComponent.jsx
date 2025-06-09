import '../styles/LoginFormComponent.css'
import { useLanguage } from '../context/LanguageContext';
import { useRef, useState } from "react";
import validate from '../utils/Validate.js'

function LoginFormComponent() {

    const { currentTexts } = useLanguage(); // suponiendo que esto viene de un hook
    const inputEmail = useRef();
    const inputPass = useRef();
    const colors = ["black", "red", "green"];
    const [emailErrorMessage, setEmailErrorMessage] = useState();
    const [passErrorMessage, setPassErrorMessage] = useState();
    
    const nextColor = () => {
        const email = inputEmail.current;
        const password = inputPass.current;

        const emailError = validate.isValidEmail(email.value);
        const passError = validate.isValidPassword(password.value);

        setEmailErrorMessage(emailError);
        setPassErrorMessage(passError);

        email.style.color = emailError === null ? colors[2] : colors[1];
        password.style.color = passError === null ? colors[2] : colors[1];

        if (emailError===null && passError === null) submitForm(email.value, password.value);
    };

    const handleTypingEmail = () => {
        inputEmail.current.style.color = "black";
    };

    const handleTypingPassword = () => {
        inputPass.current.style.color = "black";
    };

    const submitForm = async (email, pass) => {
        console.log ('enviando datos al back: \n Email: '+email+'\n Password: '+pass);
    }

    return (
        <form id="LoginForm_form">
            <div id="LoginForm_div_fields">
                <input
                    ref={inputEmail}
                    className="LoginForm_fields_input"
                    type="text"
                    placeholder={currentTexts.loginFormComponent.inputEmail}
                    onChange={handleTypingEmail}
                />
                <p style={{color: 'red'}}>
                    {emailErrorMessage}
                </p>
                <input
                    ref={inputPass}
                    className="LoginForm_fields_input"
                    type="password"
                    placeholder={currentTexts.loginFormComponent.inputPassword}
                    onChange={handleTypingPassword}
                />
                <p style={{color: 'red'}}>
                    {passErrorMessage}
                </p>
            </div>
            <button
                id="LoginForm_Submit_button"
                type="button"
                onClick={nextColor}
            >
                {currentTexts.loginFormComponent.submitButton}
            </button>
        </form>
    )
}

export default LoginFormComponent