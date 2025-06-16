import '../styles/LoginFormComponent.css'
import { useLanguage } from '../context/LanguageContext'
import { useEffect, useRef, useState } from "react"
import validate from '../utils/Validate.jsx'
import eye from '../assets/ojo.png'
import eyeCross from '../assets/ojo-cruzado.png'

function LoginFormComponent() {

    // ESTAS VARIABLES DEBEN ELIMINARSE EN PRODUCCIÖN
    const inDevelopement = true;
    const [testEmail, setTestEmail] = useState('');
    const [testPass, setTestPass] = useState('');

    const { language, currentTexts } = useLanguage();
    const [isLogged, setIsLogged] = useState(false);
    const [userName, setUserName] = useState('USER LOGGED');

    const inputEmail = useRef();
    const inputPass = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const colors = ["black", "red", "green"];
    const [emailErrorMessage, setEmailErrorMessage] = useState();
    const [passErrorMessage, setPassErrorMessage] = useState();
    const { isValidEmail, isValidPassword } = validate();
    
    const buttonAction = () => {
        const email = inputEmail.current;
        const password = inputPass.current;

        const emailError = isValidEmail(email.value);
        const passError = isValidPassword(password.value);

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

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const submitForm = async (email, pass) => {
        console.log ('enviando datos al back: \n Email: '+email+'\n Password: '+pass);
        try{
            const response = await fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: inputEmail.current.value,
                    password: inputPass.current.value
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.warn(data)
                if (data.status === 200) {
                    if (language === 'textEs') {
                        console.log(data.mensaje)
                    } else {
                        console.log(data.message)
                    }
                    window.location.href="/app/home"
                } else {
                    inputPass.current.style.color=colors[1]
                    console.log(currentTexts)
                    if (language === 'textEs') {
                        setPassErrorMessage(data.mensaje)
                        console.error(data.mensaje)
                        console.log("el status es: "+data.status)
                    } else {
                        setPassErrorMessage(data.message)
                        console.error(data.message)
                    }
                }
            } else {
                console.error("Response is not ok!");
            }
            
        } catch (error) {
            console.error("Hubo un error conectando con la API")
        }
    }

    const checkLog = async() => {
        try {
            const response = await fetch('/check_log', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setIsLogged(data.log)
                    setUserName(data.name)
                } else if (data.status === 403){
                    console.log("Session not initialized")
                } else {
                    console.log('error checking session')
                }
            } else {
                console.log("response is not Ok!")
            }
        } catch (error) {
             console.error("Hubo un error conectando con la API")
        }
    }

    const logout = async() => {
         const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        try {
            const data = await response.json()
            if (data.status==200) {
                window.location.href='/home'
            } else {
                if (currentTexts == 'TextEs') {
                    console.error(data.mensaje)
                } else {
                    console.error(data.message)
                }
            }
        } catch (error) {
            console.log("There was a problem connecting with the API")
        }
    }

    // ESTE MËTODO DEBE ELIMINARSE EN PRODUCCIÓN
    const setData = () => {
        setTestEmail("usuario@escudero.juridico.es");
        setTestPass("123456");
    }

    useEffect(()=>{
        checkLog()
        // ESTE MËTODO DEBE ELIMINARSE EN PRODUCCIÓN
        if (inDevelopement) setData()
    }, [])

    if (isLogged === true) {
        return (
            <div id="LoginForm_loggedContainer">
                <h2 id="LoginForm_loggedUserName">{userName}</h2>
                <div id="LoginForm_loggedButtonsContainer">
                    <div id="LoginForm_loggedEnterButton" onClick={() => window.location.href="/app/home"}>
                        <div id="LoginForm_leftAccessButton"></div>
                        <div id="LoginForm_centerAccessButton">
                            <p className='LoginForm_loggedButtonText'>{currentTexts.loginFormComponent.access}</p>
                        </div>
                    </div>
                    <div id="LoginForm_loggedLogoutButton" onClick={() => logout()}>
                        <div id="LoginForm_centerLogoutButton">
                            <p className='LoginForm_loggedButtonText'>{currentTexts.loginFormComponent.logout}</p>
                        </div>
                        <div id="LoginForm_rightLogoutButton"></div>
                    </div>
                </div>
            </div>
        ); 
    } else {
        return (
            <form id="LoginForm_form">
                <div id="LoginForm_div_fields">
                    <input
                        ref={inputEmail}
                        className="LoginForm_fields_input"
                        type="text"
                        placeholder={currentTexts.loginFormComponent.inputEmail}
                        onChange={handleTypingEmail}
                        defaultValue={testEmail}
                    />
                    <p style={{color: 'red'}}>
                        {emailErrorMessage}
                    </p>
                    <div id="LoginForm_passwordInputDiv">
                        <input
                            ref={inputPass}
                            className="LoginForm_fields_input"
                            type={showPassword ? "text" : "password"} // Cambia entre "text" y "password"
                            placeholder={currentTexts.loginFormComponent.inputPassword}
                            defaultValue={testPass}
                        />
                        {/* Icono de ojo para mostrar/ocultar contraseña */}
                        <span id="LoginForm_eyeIcon" onClick={togglePasswordVisibility}>
                            {showPassword ? <img src={eye} alt="Eye Icon from FlatIcon" /> : <img src={eyeCross} alt="Eye Crossed Icon from Flaticon"/>}
                            {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                            {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                        </span>
                    </div>
                    <p style={{color: 'red'}}>
                        {passErrorMessage}
                    </p>
                </div>
                <button
                    id="LoginForm_Submit_button"
                    type="button"
                    onClick={buttonAction}
                >
                    {currentTexts.loginFormComponent.submitButton}
                </button>
            </form>
        )
    }

}

export default LoginFormComponent