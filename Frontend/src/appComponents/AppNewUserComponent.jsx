import { useNavigate } from 'react-router-dom';
import '../appStyles/AppNewUserComponent.css'
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import Validate from '../utils/Validate';

function AppNewUserComponent() {
    
    const { language, currentTexts } = useLanguage();
    const navigate = useNavigate();
    
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passInput1, setPassInput1] = useState('');
    const [passInput2, setPassInput2] = useState('');
    const [roleInput, setRoleInput] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError1, setPassError1] = useState('');
    const [passError2, setPassError2] = useState('');
    const [roleError, setRoleError] = useState('');

    const { isValidEmail, isValidPassword, isValidName, isValidRole } = Validate();

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

        if (isValidRole(roleInput) !== null) {
            setRoleError(isValidRole(roleInput))
            submit = false;
        } else {
            setRoleError('')
        }

        if (submit === true) {
            submitForm();
        }
    }

    const submitForm = async() => {
        // Esto es temporal
        var role = 0
        
        if (roleInput?.includes('user')){
            role = 10
        } else if (roleInput?.includes('admin')) {
            role = 20
        }

        try {
            const response = await fetch('/new_user_submit', {
                method: 'POST',
                headers: {  'Content-Type': 'application/json', },
                body: JSON.stringify ({
                    name: nameInput,
                    email: emailInput,
                    password: passInput1,
                    role: role,
                })
            });
            if (response.ok) {
                const data = await response.json()
                if (data.status == 200) {
                    console.log("User Created Successfully")
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

    return(
        <div id='AppNewUser_container'>
            <div id='AppNewUser_navbar'>
                <div id='AppNewUser_navbarMyData' onClick={() => navigate('/app/home')}>
                    <p className='AppNewUser_navbarText'>{currentTexts.appHome.myData}</p>
                </div>
                <div id='AppNewUser_navbarNewUser' onClick={() => navigate('/app/new_user')}>
                    <p className='AppNewUser_navbarText'>{currentTexts.appHome.newUser}</p>
                </div>
                <div id='AppNewUser_navbarAllUsers' onClick={() => navigate('/app/all_users')}>
                    <p className='AppNewUser_navbarText'>{currentTexts.appHome.allUsers}</p>
                </div>
            </div>
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
                            <input id="AppNewUser_emailInput" className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.emailPlaceholder} onChange={(event)=>setEmailInput(event.target.value.trim())}/>
                            <p className='AppNewUser_errorText'>{emailError}</p>
                        </div>
                    </div>
                    <div className='AppNewUser_formLine'>
                        <div className='AppNewUser_formColumn'>
                            <h3 className='AppNewUser_formInputTitle' title={currentTexts.newUserComponent.passwordTitleText}>{currentTexts.newUserComponent.passLabel1}</h3>
                            <input id="AppNewUser_passInput1" className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.passwordPlaceholder} onChange={(event)=>setPassInput1(event.target.value.trim())}/>
                            <p className='AppNewUser_errorText'>{passError1}</p>
                        </div>
                        <div className='AppNewUser_formColumn'>
                            <h3 className='AppNewUser_formInputTitle' title={currentTexts.newUserComponent.repeatPassTitleText}>{currentTexts.newUserComponent.passLabel2}</h3> 
                            <input id="AppNewUser_passInput2" className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.passwordPlaceholder} onChange={(event)=>setPassInput2(event.target.value.trim())}/>
                            <p className='AppNewUser_errorText'>{passError2}</p>
                        </div>
                    </div>
                    <div className='AppNewUser_formLine'>
                        <div className='AppNewUser_formColumn'>
                            <h3 className='AppNewUser_formInputTitle' title={currentTexts.newUserComponent.roleTitleText}>{currentTexts.newUserComponent.roleLabel}</h3>
                            <input id="AppNewUser_roleInput" className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.rolePlaceholder} onChange={(event)=>setRoleInput(event.target.value.trim())}/>
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