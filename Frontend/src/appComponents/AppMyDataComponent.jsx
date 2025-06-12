import { useEffect, useState } from 'react';
import '../appStyles/AppMyDataComponent.css'
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from 'react-router-dom';

function AppMyDataComponent() {

    const { language, currentTexts } = useLanguage();
    const navigate = useNavigate();

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
                console.log("Response is not ok")
            }
        } catch (error) {
            console.log("There was an error connecting the API")
        }
    }

    useEffect(()=>{
        setData()
    }, [])

    return(
        <div id='AppMyDataComponent_contentContainer'>
            <div id='AppMyDataComponent_contentNavbar'>
                <div id='AppMyDataComponent_navbarMyData'>
                    <p className='AppMyDataComponent_navbarText'>{currentTexts.appHome.myData}</p>
                </div>
                <div id='AppMyDataComponent_navbarNewUser' onClick={() => navigate('/app/new_user')}>
                    <p className='AppMyDataComponent_navbarText'>{currentTexts.appHome.newUser}</p>
                </div>
                <div id='AppMyDataComponent_navbarAllUsers' onClick={() => navigate('/app/all_users')}>
                    <p className='AppMyDataComponent_navbarText'>{currentTexts.appHome.allUsers}</p>
                </div>
            </div>
            <div id='AppMyDataComponent_formContainer'>
                <h1 id='AppMyDataComponent_formTitle'>{currentTexts.myDataComponent.formTitle}</h1>
                <form id="AppMyDataComponent_form">
                    <div className='AppMyDataComponent_formLine'>
                        <div className='AppMyDataComponent_formColumn'>
                            <h3 className='AppMyDataComponent_formInputTitle' title={currentTexts.newUserComponent.nameTitleText}>{currentTexts.newUserComponent.nameLabel}</h3>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.inputPlaceholder} defaultValue={nameInput}/>
                            <p className='AppMyDataComponent_errorText'>{nameError}</p>
                        </div>
                        <div className='AppMyDataComponent_formColumn'>
                            <h3 className='AppMyDataComponent_formInputTitle' title={currentTexts.newUserComponent.passwordTitleText}>{currentTexts.newUserComponent.passLabel1}</h3>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.passInput1}/>
                            <p className='AppMyDataComponent_errorText'>{passError1}</p>
                        </div>
                    </div>
                    <div className='AppMyDataComponent_formLine'>
                        <div className='AppMyDataComponent_formColumn'>
                            <h3 className='AppMyDataComponent_formInputTitle' title={currentTexts.newUserComponent.emailTitleText}>{currentTexts.newUserComponent.emailLabel}</h3>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.inputPlaceholder} defaultValue={emailInput}/>
                            <p className='AppMyDataComponent_errorText'>{emailError}</p>
                        </div>
                        <div className='AppMyDataComponent_formColumn'>
                            <h3 className='AppMyDataComponent_formInputTitle' title={currentTexts.newUserComponent.repeatPassTitleText}>{currentTexts.newUserComponent.passLabel2}</h3> 
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.passInput2}/>
                            <p className='AppMyDataComponent_errorText'>{passError2}</p>
                        </div>
                    </div>
                    <div className='AppMyDataComponent_formLine'>
                        <div id='AppMyDataComponent_buttonContainer'>
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