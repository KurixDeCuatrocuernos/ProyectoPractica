import { useEffect, useState } from 'react';
import '../appStyles/AppMyDataComponent.css'
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from 'react-router-dom';
import Validate from '../utils/Validate';

function AppMyDataComponent() {

    const { language, currentTexts } = useLanguage();
    const navigate = useNavigate();
    const {isValidEmail, isValidPassword, isValidName, isValidRole } = Validate();
    const [modifiedPassword, setModifiedPassword] = useState(false)

    const [currentEmail, setCurrentEmail] = useState('')
    const [currentName, setCurrentName] = useState('')

    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')
    const [passError1, setPassError1] = useState(currentTexts.myDataComponent.passError)
    const [passError2, setPassError2] = useState(currentTexts.myDataComponent.passError)

    const [emailInput, setEmailInput] = useState('')
    const [nameInput, setNameInput] = useState('')
    const [passInput1, setPassInput1] = useState('')
    const [passInput2, setPassInput2] = useState('')

    const setData = async() => {
        try {
            const response = await fetch('/get_current_data', {
                method: 'POST', 
                headers:{'Content-Type': 'application/json'}
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    
                    (data.user.email) ? setEmailInput(data.user.email) : setEmailError('Error recogiendo el email');
                    (data.user.name) ? setNameInput(data.user.name) : setNameError('Error recogiendo el nombre');
                    setCurrentEmail(data.user.email)
                    setCurrentName(data.user.name)
                    setPassInput1('');
                    setPassInput2('');
                    setPassError1('');
                    setPassError2('');

                } else {
                    if (language === 'textEs') {
                        console.log(data.mensaje)
                    } else {
                        console.log(data.message)
                    }
                }
            } else {
                {/* Mostrar mensaje de error */}
                console.log("Response is not Ok!")
            }
        } catch (error) {
            console.log("Hubo un error al conectar con la API")
        }
    }

    const checkData = async() => {
        var isValidForm = true
        if (isValidEmail(emailInput) !== null) {
            isValidForm = false
            setEmailError(isValidEmail(emailInput))
        }
        if (isValidName(nameInput) !== null) {
            isValidForm = false
            setNameError(isValidName(nameInput))
        }
        if (modifiedPassword) {
            if (isValidPassword(passInput1) !== null) {
                isValidForm = false
                setPassError1(isValidPassword(passInput1))
            }
            if (passInput1 !== passInput2) {
                isValidForm = false
                if (language === 'textEs') {
                    setPassError2("¡Las contraseñas no coinciden!")
                } else {
                    setPassError2("Mismatch passwords!")
                }
            }
        }

        if (isValidForm) {
            if (currentEmail===emailInput && currentName===nameInput && modifiedPassword === false){
                console.log("No se ha modificado nada")
            } else {
                updateUser()
            }
        } else {
            console.log("Formulario Inválido")
        }
    }

    const updateUser = async() => {
        try {
            const response = await fetch('/update_current_user_data', {
                method: 'POST',
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify({
                    email: emailInput !== currentEmail ? emailInput : null,
                    name: nameInput !== currentName ? nameInput : null,
                    password: modifiedPassword === true ? passInput1 : null    
                })
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    // Sería buena idea mandar un mensaje de confirmación antes de recargar
                    window.location.reload()
                } else {
                    (language === 'textEs') ? console.log(data.mensaje) : console.log(data.message)
                }
            } else {
                
                console.log("Response is not Ok!")
            }
        } catch (error) {
            console.log("Hubo un error al conectar con la API")
        }
    }

    useEffect(()=>{
        setData()
    }, [])

    useEffect(() => {
        if(passInput1 !=='') {
            setModifiedPassword(true)
        } else {
            setModifiedPassword(false)
        }
    }, [passInput1])

    useEffect(() => {
        if (emailError !== '') setEmailError('')
    },[emailInput])

    useEffect(() => {
        if (nameError !== '') setNameError('')
    },[nameInput])

    useEffect(() => {
        if (passError1 !== '') setPassError1('')
    },[passInput1])

    useEffect(() => {
        if (passInput2 !== '') setPassError2('')
    },[passInput2])

    return(
        <div id='AppMyDataComponent_contentContainer'>
            <div id='AppMyDataComponent_formContainer'>
                <h1 id='AppMyDataComponent_formTitle'>{currentTexts.myDataComponent.formTitle}</h1>
                <form id="AppMyDataComponent_form">
                    <div className='AppMyDataComponent_formLine'>
                        <div className='AppMyDataComponent_formColumn'>
                            <h3 className='AppMyDataComponent_formInputTitle' title={currentTexts.newUserComponent.nameTitleText}>{currentTexts.newUserComponent.nameLabel}</h3>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.inputPlaceholder} defaultValue={nameInput} onChange={(event) => setNameInput(event.target.value)}/>
                            <p className='AppMyDataComponent_errorText'>{nameError}</p>
                        </div>
                        <div className='AppMyDataComponent_formColumn'>
                            <h3 className='AppMyDataComponent_formInputTitle' title={currentTexts.newUserComponent.passwordTitleText}>{currentTexts.newUserComponent.passLabel1}</h3>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.passInput1} onChange={(event) => setPassInput1(event.target.value) }/>
                            <p className='AppMyDataComponent_errorText'>{passError1}</p>
                        </div>
                    </div>
                    <div className='AppMyDataComponent_formLine'>
                        <div className='AppMyDataComponent_formColumn'>
                            <h3 className='AppMyDataComponent_formInputTitle' title={currentTexts.newUserComponent.emailTitleText}>{currentTexts.newUserComponent.emailLabel}</h3>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.inputPlaceholder} defaultValue={emailInput} onChange={(event) => setEmailInput(event.target.value) }/>
                            <p className='AppMyDataComponent_errorText'>{emailError}</p>
                        </div>
                        <div className='AppMyDataComponent_formColumn'>
                            <h3 className='AppMyDataComponent_formInputTitle' title={currentTexts.newUserComponent.repeatPassTitleText}>{currentTexts.newUserComponent.passLabel2}</h3> 
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.passInput2} onChange={(event) => setPassInput2(event.target.value) }/>
                            <p className='AppMyDataComponent_errorText'>{passError2}</p>
                        </div>
                    </div>
                    <div className='AppMyDataComponent_formLine'>
                        <div id='AppMyDataComponent_buttonContainer' onClick={() => checkData()}>
                            <div id="AppMyDataComponent_leftButton"></div>
                            <div id="AppMyDataComponent_centerButton">
                                <p id="AppMyDataComponent_textButton">{currentTexts.myDataComponent.textButton}</p>
                            </div>
                            <div id="AppMyDataComponent_rightButton"></div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default AppMyDataComponent