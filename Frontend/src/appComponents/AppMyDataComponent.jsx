import '../appStyles/AppMyDataComponent.css'
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from 'react-router-dom';

function AppMyDataComponent() {

    const { currentTexts } = useLanguage();
    const navigate = useNavigate();

    return(
        <div id='AppMyDataComponent_contentContainer'>
            <div id='AppMyDataComponent_contentNavbar'>
                <div id='AppMyDataComponent_navbarMyData'>
                    <p className='AppMyDataComponent_navbarText'>{currentTexts.appHome.myData}</p>
                </div>
                <div id='AppMyDataComponent_navbarNewUser' onClick={() => navigate('/app/new_user')}>
                    <p className='AppMyDataComponent_navbarText'>{currentTexts.appHome.newUser}</p>
                </div>
            </div>
            <div id='AppMyDataComponent_formContainer'>
                <h1 id='AppMyDataComponent_formTitle'>{currentTexts.myDataComponent.formTitle}</h1>
                <form>
                    <div className='AppMyDataComponent_formLine'>
                        <div className='AppMyDataComponent_formColumn'>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.inputPlaceholder}/>
                            <p className='AppMyDataComponent_errorText'>Error</p>
                        </div>
                        <div className='AppMyDataComponent_formColumn'>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.inputPlaceholder}/>
                            <p className='AppMyDataComponent_errorText'>Error</p>
                        </div>
                    </div>
                    <div className='AppMyDataComponent_formLine'>
                        <div className='AppMyDataComponent_formColumn'>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.inputPlaceholder}/>
                            <p className='AppMyDataComponent_errorText'>Error</p>
                        </div>
                        <div className='AppMyDataComponent_formColumn'>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.inputPlaceholder}/>
                            <p className='AppMyDataComponent_errorText'>Error</p>
                        </div>
                    </div>
                    <div className='AppMyDataComponent_formLine'>
                        <div className='AppMyDataComponent_formColumn'>
                            <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.inputPlaceholder}/>
                            <p className='AppMyDataComponent_errorText'>Error</p>
                        </div>
                        <div className='AppMyDataComponent_formColumn'>
                                <input className='AppMyDataComponent_formInput' type="text" placeholder={currentTexts.myDataComponent.inputPlaceholder}/>
                                <p className='AppMyDataComponent_errorText'>Error</p>
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