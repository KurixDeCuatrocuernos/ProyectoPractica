import { useNavigate } from 'react-router-dom';
import '../appStyles/AppNewUserComponent.css'
import { useLanguage } from '../context/LanguageContext';

function AppNewUserComponent() {
    
    const { currentTexts } = useLanguage();
    const navigate = useNavigate();

    return(
        <div id='AppNewUser_container'>
            <div id='AppNewUser_navbar'>
                <div id='AppNewUser_navbarMyData' onClick={() => navigate('/app/home')}>
                    <p className='AppNewUser_navbarText'>{currentTexts.appHome.myData}</p>
                </div>
                <div id='AppNewUser_navbarNewUser' onClick={() => navigate('/app/new_user')}>
                    <p className='AppNewUser_navbarText'>{currentTexts.appHome.newUser}</p>
                </div>
            </div>
            <div id='AppNewUser_formContainer'>
                <h1 id='AppNewUser_formTitle'>{currentTexts.newUserComponent.formTitle}</h1>
                <form>
                    <div className='AppNewUser_formLine'>
                        <div className='AppNewUser_formColumn'>
                            <input className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.inputPlaceholder}/>
                            <p className='AppNewUser_errorText'>Error</p>
                        </div>
                        <div className='AppNewUser_formColumn'>
                            <input className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.inputPlaceholder}/>
                            <p className='AppNewUser_errorText'>Error</p>
                        </div>
                    </div>
                    <div className='AppNewUser_formLine'>
                        <div className='AppNewUser_formColumn'>
                            <input className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.inputPlaceholder}/>
                            <p className='AppNewUser_errorText'>Error</p>
                        </div>
                        <div className='AppNewUser_formColumn'>
                            <input className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.inputPlaceholder}/>
                            <p className='AppNewUser_errorText'>Error</p>
                        </div>
                    </div>
                    <div className='AppNewUser_formLine'>
                        <div className='AppNewUser_formColumn'>
                            <input className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.inputPlaceholder}/>
                            <p className='AppNewUser_errorText'>Error</p>
                        </div>
                        <div className='AppNewUser_formColumn'>
                                <input className='AppNewUser_formInput' type="text" placeholder={currentTexts.newUserComponent.inputPlaceholder}/>
                                <p className='AppNewUser_errorText'>Error</p>
                        </div>
                    </div>
                    <div className='AppNewUser_formLine'>
                        <div id='AppNewUser_buttonContainer'>
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