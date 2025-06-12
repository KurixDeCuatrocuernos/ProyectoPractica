import '../appStyles/AppHomePage.css'
import { useLanguage } from '../context/LanguageContext.jsx';
import AppMyDataComponent from '../appComponents/AppMyDataComponent.jsx';
import { useNavigate } from 'react-router-dom';

function AppHomePage() {

    const { currentTexts } = useLanguage();
    const navigate = useNavigate();

    return(
        <div id="AppHomePage_container">
            <div id='AppHomePage_backgroundOverlay'>
                <div id='AppHomePage_ubicationText_container'>
                    <h2 id="AppHomePage_ubicationText">{currentTexts.appHome.homeMessage}</h2>
                </div>
                <div id='AppHomePage_navbarContainer'>
                    <div id='AppHomePage_navbarUser' onClick={()=>navigate('/app/home')}>
                        <p className='AppHomePage_navbarText'>{currentTexts.appHome.user}</p>
                    </div>
                    <div id='AppHomePage_navbarBills' onClick={()=>navigate('/app/bills')}>
                        <p className='AppHomePage_navbarText'>{currentTexts.appHome.bills}</p>
                    </div>
                </div>
                <AppMyDataComponent/>
            </div>
        </div>
    );
}

export default AppHomePage;