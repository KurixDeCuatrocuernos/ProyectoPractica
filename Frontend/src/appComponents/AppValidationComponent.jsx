import { useEffect, useState } from 'react'
import '../appStyles/AppValidationComponent.css'
import { useLanguage } from '../context/LanguageContext'
import eye from '../assets/ojo.png'
import eyeCross from '../assets/ojo-cruzado.png'
import Validate from '../utils/Validate'

function AppValidationComponent({ setShowValidationWarning }) {

    const { language, currentTexts} = useLanguage()
    const [isValidating, setIsValidating] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPass1, setNewPass1] = useState('')
    const [newPass2, setNewPass2] = useState('')
    const [showPassIcon, setShowPassIcon] = useState(eye)
    const [showPassIcon1, setShowPassIcon1] = useState(eye)
    const [showPassIcon2, setShowPassIcon2] = useState(eye)
    const [currentPassError, setCurrentPassError] = useState('')
    const [newPassError1, setNewPassError1] = useState('')
    const [newPassError2, setNewPassError2] = useState('')
    const {isValidPassword} = Validate()

    const cancelValidation = async() => {
        try {
            const response = await fetch('/off_validation')
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setShowValidationWarning(false)
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

    const validateUser = async() => {
        try {
            const response = await fetch('/off_validation')
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setShowValidationWarning(false)
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

    const togglePassword = () => {
        (showPassIcon === eye) ? setShowPassIcon(eyeCross) : setShowPassIcon(eye)
    }

    const togglePassword1 = () => {
        (showPassIcon1 === eye) ? setShowPassIcon1(eyeCross) : setShowPassIcon1(eye)
    }

    const togglePassword2 = () => {
        (showPassIcon2 === eye) ? setShowPassIcon2(eyeCross) : setShowPassIcon2(eye)
    }

    const checkCurrentPassword = async() => {

        if (isValidPassword(oldPassword) !== null) {
            setCurrentPassError(isValidPassword(oldPassword))
        } else {
            try {
                const response = await fetch('/check_current_password', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ password: oldPassword })
                })
                if (response.ok) {
                    const data = await response.json()
                    if (data.status === 200) {
                        if (data.result === true) {
                            setValidPassword(true)
                        } else {
                            (language === 'textEs') ? setCurrentPassError("Contraseña incorrecta") : setCurrentPassError("Wrong Password")
                        }
                        console.log(validPassword)
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
    }

    const checkNewPasswords = () => {
        if (isValidPassword(newPass1) !== null) {
            setNewPassError1(isValidPassword(newPass1))
        } else if (newPass1 === oldPassword){
             if (language === 'textEs') {
                setNewPassError1("No puedes usar la misma contraseña")
            } else {
                setNewPassError1("You can't use the same password!")
            }
        } else if (newPass1 !== newPass2) {
            if (language === 'textEs') {
                setNewPassError2("¡Las contraseñas no coinciden!")
            } else {
                setNewPassError2("Missmatch passwords!")
            }
        } else {
            submitData()
        }
    }

    const submitData = async() => {
        try {
            const response = await fetch('/post_update_password', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ password: newPass1 })
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setShowValidationWarning(false)
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

    useEffect(() => { if (currentPassError !== '') setCurrentPassError('') }, [oldPassword])
    useEffect(() => { if (newPassError1 !== '') setNewPassError1('') }, [newPass1])
    useEffect(() => { if (newPassError2 !== '') setNewPassError2('') }, [newPass2])

    if (!isValidating) {
        return (
            <div id='AppValidationComponent_overlay'>
                <div id='AppValidationComponent_container'>
                    
                    <div id='AppValidationComponent_warningIconContainer'>
                        <p id='AppValidationComponent_warningIconText'>!</p>
                    </div>

                    <p id='AppValidationComponent_Text'>
                    {currentTexts.appValidationComponent.title}
                    </p>
                    
                    <div id='AppValidationComponent_buttonsContainer'>
                        <div id='AppValidationComponent_confirmButtonContainer'  onClick={() => setIsValidating(true)}>
                            <div id='AppValidationComponent_confirmButtonLeft'/>
                            <div id='AppValidationComponent_confirmButtonCenter'>
                                {currentTexts.appValidationComponent.confirmButton1}
                            </div>
                            <div id='AppValidationComponent_confirmButtonRight'/>
                        </div>
                        
                        <div id='AppValidationComponent_cancelButtonContainer' onClick={() => cancelValidation()}>
                            <div id='AppValidationComponent_cancelButtonLeft'/>
                            <div id='AppValidationComponent_cancelButtonCenter'>
                                {currentTexts.appValidationComponent.cancelButton1}
                            </div>
                            <div id='AppValidationComponent_cancelButtonRight'/>
                        </div>
                    </div>
                
                </div>
            </div>
        )

    } else {

        if (!validPassword) {
            return (
                <div id='AppValidationComponent_overlay'>
                    <form id='AppValidationComponent_container'>

                        <p id='AppValidationComponent_Text' style={{textAlign:'center'}}>
                            Cambiando Contraseña
                        </p>

                        <label className='AppValidationComponent_formLabel'>
                            Contraseña Actual: 
                        </label>
                        <div className='AppValidationComponent_formInputWrapper'>
                            <input className='AppValidationComponent_formInput' type={(showPassIcon===eye) ? "password" : "text"} onChange={(event) => setOldPassword(event.target.value)}/>
                            <img className='AppValidationComponent_eyeIcon' src={showPassIcon} alt="Eye Icon from FlatIcon" onClick={() => togglePassword()}/>
                            {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                            {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                        </div>
                        <p className='AppValidationComponent_errorMessage'>{currentPassError}</p>

                        <div id='AppValidationComponent_buttonsContainer'>
                            <div id='AppValidationComponent_confirmButtonContainer' onClick={() => checkCurrentPassword()}>
                                <div id='AppValidationComponent_confirmButtonLeft'/>
                                <div id='AppValidationComponent_confirmButtonCenter'>
                                    Aceptar
                                </div>
                                <div id='AppValidationComponent_confirmButtonRight'/>
                            </div>
                            
                            <div id='AppValidationComponent_cancelButtonContainer' onClick={() => setIsValidating(false)}>
                                <div id='AppValidationComponent_cancelButtonLeft'/>
                                <div id='AppValidationComponent_cancelButtonCenter'>
                                    Cancelar
                                </div>
                                <div id='AppValidationComponent_cancelButtonRight'/>
                            </div>
                        </div>
                    
                    </form>
                </div>
            ) 
        } else {
            return (
                <div id='AppValidationComponent_overlay'>
                    <div id='AppValidationComponent_container'>

                        <p id='AppValidationComponent_Text' style={{textAlign:'center'}}>
                            Cambiando Contraseña
                        </p>

                        <label className='AppValidationComponent_formLabel'>
                            Nueva Contraseña: 
                        </label>
                        <div className='AppValidationComponent_formInputWrapper'>
                            <input className='AppValidationComponent_formInput' type={(showPassIcon1===eye) ? "password" : "text"} onChange={(event) => setNewPass1(event.target.value)}/>
                            <img className='AppValidationComponent_eyeIcon' src={showPassIcon1} alt="Eye Icon from FlatIcon" onClick={() => togglePassword1()}/>
                            {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                            {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                        </div>
                        <p className='AppValidationComponent_errorMessage'>{newPassError1}</p>

                        <label className='AppValidationComponent_formLabel'>
                            Repite la contraseña: 
                        </label>
                        <div className='AppValidationComponent_formInputWrapper'>
                            <input className='AppValidationComponent_formInput' type={(showPassIcon2===eye) ? "password" : "text"} onChange={(event) => setNewPass2(event.target.value)}/>
                            <img className='AppValidationComponent_eyeIcon' src={showPassIcon2} alt="Eye Icon from FlatIcon" onClick={() => togglePassword2()}/>
                            {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                            {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                        </div>
                        <p className='AppValidationComponent_errorMessage'>{newPassError2}</p>
                    
                        <div id='AppValidationComponent_buttonsContainer'>
                            <div id='AppValidationComponent_confirmButtonContainer' onClick={() => checkNewPasswords()}>
                                <div id='AppValidationComponent_confirmButtonLeft'/>
                                <div id='AppValidationComponent_confirmButtonCenter'>
                                    Aceptar
                                </div>
                                <div id='AppValidationComponent_confirmButtonRight'/>
                            </div>
                            
                            <div id='AppValidationComponent_cancelButtonContainer' onClick={() => {setValidPassword(false); setIsValidating(false);}}>
                                <div id='AppValidationComponent_cancelButtonLeft'/>
                                <div id='AppValidationComponent_cancelButtonCenter'>
                                    Cancelar
                                </div>
                                <div id='AppValidationComponent_cancelButtonRight'/>
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
        
    }
}

export default AppValidationComponent
