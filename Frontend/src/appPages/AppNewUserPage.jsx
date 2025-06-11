import AppNewUserComponent from '../appComponents/AppNewUserComponent';
import '../appStyles/AppNewUserPage.css'
import { useLanguage } from '../context/LanguageContext'

function AppNewUserPage() {

    const { currentTexts } = useLanguage(); 
    
    return(
        <div id="AppNewUserPage_container">
            <div id='AppNewUserPage_backgroundOverlay'>
                <div id='AppNewUserPage_ubicationText_container'>
                    <h2 id="AppNewUserPage_ubicationText">{currentTexts.appHome.homeMessage}</h2>
                </div>
                <div id='AppNewUserPage_navbarContainer'>
                    <div id='AppNewUserPage_navbarUser'>
                        <p className='AppNewUserPage_navbarText'>{currentTexts.appHome.user}</p>
                    </div>
                    <div id='AppNewUserPage_navbarBills'>
                        <p className='AppNewUserPage_navbarText'>{currentTexts.appHome.bills}</p>
                    </div>
                </div>
                <AppNewUserComponent/>
            </div>
        </div>
    )
}
export default AppNewUserPage