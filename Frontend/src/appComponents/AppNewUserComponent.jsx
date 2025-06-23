import { useNavigate } from 'react-router-dom';
import '../appStyles/AppNewUserComponent.css'
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState } from 'react';
import Validate from '../utils/Validate';
import eye from '../assets/ojo.png'
import eyeCross from '../assets/ojo-cruzado.png'

function AppNewUserComponent() {
    
    const { language, currentTexts } = useLanguage();
    const navigate = useNavigate();
    
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passInput1, setPassInput1] = useState('');
    const [passInput2, setPassInput2] = useState('');
    const [roleInput, setRoleInput] = useState("");

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError1, setPassError1] = useState('');
    const [passError2, setPassError2] = useState('');
    const [roleError, setRoleError] = useState('');

    const [passImage1, setPassImage1] = useState(eye)
    const [showPassword1, setShowPassword1] = useState("password")
    const [passImage2, setPassImage2] = useState(eye)
    const [showPassword2, setShowPassword2] = useState("password")
    const { isValidEmail, isValidPassword, isValidName, isValidRole } = Validate();
    const [currentRoles, setCurrentRoles] = useState([])

    const getRoles = async() => {
        try {
            const response = await fetch ('/get_roles', {
                method:'POST',
                headers: { 'Content-Type': 'application/json', }
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setCurrentRoles(data.roles);
                } else {
                    if(language==='textEs'){
                        console.log(data.mensaje)
                    } else {
                        console.log(data.message)
                    }
                }
            } else {
                console.log("Response is not ok")
            }
        } catch (error) {
            console.log("Hubo un error al conectar con la API: "+error)
        }
    }

    const checkData = () => {
        var submit = true;
        
        if(isValidName(nameInput) !== null) {
            setNameError(isValidName(nameInput))
            submit = false;
        } else {
            setNameError('')
        }

        if (isValidEmail(emailInput) !== null) {
            setEmailError(isValidEmail(emailInput))
            submit = false;
        } else {
            setEmailError('')
        }

        if (isValidPassword(passInput1) !== null) {
            setPassError1(isValidPassword(passInput1))
            submit = false;
        } else {
            setPassError1('')
        }

        if (isValidPassword(passInput2) !== null) {
            setPassError2(isValidPassword(passInput2))
            submit = false;
        } else if (passInput1 !== passInput2) {
            setPassError2(currentTexts.newUserComponent.unequalPasswords)
            submit = false;
        } else {
            setPassError2('')
        }

        if (roleInput === "") {
            if (language === 'textEs') {
                setRoleError("El Usuario ha de tener un rol, si no quieres que tenga uno asigna 'Null'")
            }
            else {
                setRoleError("The user must have a role, if you don't want to assign one, set it to 'Null'.")
            }
            submit = false;
        } else {
            setRoleError('')
        }

        if (submit === true) {
            submitForm();
        }
    }

    const submitForm = async() => {
        
        const roleEncontrado = currentRoles.find(role =>
            role.name.toLowerCase() === roleInput.toLowerCase()
        );

        try {
            const response = await fetch('/new_user_submit', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: nameInput,
                    email: emailInput,
                    password: passInput1,
                    role: roleEncontrado.id,
                })
            });
            if (response.ok) {
                const data = await response.json()
                if (data.status == 200) {
                    console.log("User Created Successfully")
                    window.location.reload()
                } else {
                    if (language === 'textEs') {
                        console.log(data.mensaje)
                    } else {
                        console.log(data.message)
                    }
                }
            } else {
                console.log("Response is not ok!")
            }
        } catch (error) {
            console.log("There was a problem connecting with API")
        }
    }

    const togglePassword1 = () => {
        if (passImage1 === eye && showPassword1 === "password") {
            setPassImage1(eyeCross)
            setShowPassword1("text")
        } else {
            setPassImage1(eye)
            setShowPassword1("password")
        }
    }
    
    const togglePassword2 = () => {
        if (passImage2 === eye && showPassword2 === "password") {
            setPassImage2(eyeCross)
            setShowPassword2("text")
        } else {
            setPassImage2(eye)
            setShowPassword2("password")
        }
    }

    useEffect(() => {
        getRoles()
    }, [])

    /* Eliminan el mensaje de error si el input cambia */
    useEffect(() => { if (nameError !== '') setNameError('') },[nameInput])
    useEffect(() => { if (emailError !== '') setEmailError('') },[emailInput])
    useEffect(() => { if (passError1 !== '') setPassError1('') },[passInput1])
    useEffect(() => { if (passError2 !== '') setPassError2('') },[passInput2])
    useEffect(() => { if (roleError !== '') setRoleError('') },[roleInput])

    return(
        <div id='AppNewUser_container'>
            <div id='AppNewUser_formContainer'>
                <h1 id='AppNewUser_formTitle'>{currentTexts.newUserComponent.formTitle}</h1>
                <form>
                    <div className='AppNewUser_formLine'>
                        <div className='AppNewUser_formColumn'>
                            <h3 className='AppNewUser_formInputTitle' title={currentTexts.newUserComponent.nameTitleText}>{currentTexts.newUserComponent.nameLabel}</h3>
                            <input id="AppNewUser_nameInput" className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.namePlaceholder} onChange={(event)=>setNameInput(event.target.value.trim())}/>
                            <p className='AppNewUser_errorText'>{nameError}</p>
                        </div>
                        <div className='AppNewUser_formColumn'>
                            <h3 className='AppNewUser_formInputTitle' title={currentTexts.newUserComponent.emailTitleText}>{currentTexts.newUserComponent.emailLabel}</h3>
                            <input id="AppNewUser_emailInput" className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.emailPlaceholder} onChange={(event)=>setEmailInput(event.target.value.trim())} name="email" autoComplete="email"/>
                            <p className='AppNewUser_errorText'>{emailError}</p>
                        </div>
                    </div>
                    <div className='AppNewUser_formLine'>
                        <div className='AppNewUser_formColumn'>
                            <h3 className='AppNewUser_formInputTitle' title={currentTexts.newUserComponent.passwordTitleText}>{currentTexts.newUserComponent.passLabel1}</h3>
                            <div className='AppNewUser_inputWrapper'>
                                <input id="AppNewUser_passInput1" className='AppNewUser_formInput' type={showPassword1} placeholder={currentTexts.newUserComponent.passwordPlaceholder} onChange={(event)=>setPassInput1(event.target.value.trim())} name="new-password" autoComplete="new-password"/>
                                <img className='AppNewUser_eyeButton' src={passImage1} alt="Eye Icon from FlatIcon" onClick={togglePassword1}/>
                                {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                                {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                            </div>
                            <p className='AppNewUser_errorText'>{passError1}</p>
                        </div>
                        <div className='AppNewUser_formColumn'>
                            <h3 className='AppNewUser_formInputTitle' title={currentTexts.newUserComponent.repeatPassTitleText}>{currentTexts.newUserComponent.passLabel2}</h3> 
                            <div className='AppNewUser_inputWrapper'>
                                <input id="AppNewUser_passInput2" className='AppNewUser_formInput' type={showPassword2} placeholder={currentTexts.newUserComponent.passwordPlaceholder} onChange={(event)=>setPassInput2(event.target.value.trim())} name="confirm-password" autoComplete="new-password"/>
                                <img className='AppNewUser_eyeButton' src={passImage2} alt="Eye Icon from FlatIcon" onClick={togglePassword2}/>
                                {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                                {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
                            </div>
                            <p className='AppNewUser_errorText'>{passError2}</p>
                        </div>
                    </div>
                    <div className='AppNewUser_formLine'>
                        <div className='AppNewUser_formColumn'>
                            <h3 className='AppNewUser_formInputTitle' title={currentTexts.newUserComponent.roleTitleText}>{currentTexts.newUserComponent.roleLabel}</h3>
                            <select id="AppNewUser_roleInput" className='AppNewUser_formRoleInput' onChange={(event)=>setRoleInput(event.target.value.trim())}>
                                <option value="0" default hidden>{currentTexts.newUserComponent.roleDefaultOption}</option>
                                {
                                    currentRoles.map(role => {
                                        const filteredRole = role.name.replace(/^ROLE_/, "")
                                                                        .charAt(0).toUpperCase() + 
                                                            role.name.replace(/^ROLE_/, "").slice(1).toLowerCase();
                                        
                                        return (
                                            <option key={role.id} className='AppNewUser_formRoleInput' value={role.name}>
                                                {filteredRole}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                            <p className='AppNewUser_errorText'>{roleError}</p>
                        </div>
                    </div>
                    <div className='AppNewUser_formLine'>
                        <div id='AppNewUser_buttonContainer' onClick={()=>checkData()}>
                            <div id="AppNewUser_leftButton"></div>
                            <div id="AppNewUser_centerButton">
                                <p id="AppNewUser_textButton">{currentTexts.newUserComponent.textButton}</p>
                            </div>
                            <div id="AppNewUser_rightButton"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AppNewUserComponent