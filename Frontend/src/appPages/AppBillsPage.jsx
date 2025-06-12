import { useNavigate } from 'react-router-dom'
import AppBillsListComponent from '../appComponents/AppBillsListComponent'
import '../appStyles/AppBillsPage.css'
import { useLanguage } from '../context/LanguageContext'


function AppBillsPage() {

    const { currentTexts } = useLanguage()
    const navigate = useNavigate();

    return(
        <div id="AppBillsPage_container">
            <div id='AppBillsPage_backgroundOverlay'>
                <div id='AppBillsPage_ubicationText_container'>
                    <h2 id="AppBillsPage_ubicationText">{currentTexts.appHome.homeMessage}</h2>
                </div>
                <div id='AppBillsPage_navbarContainer'>
                    <div id='AppBillsPage_navbarUser' onClick={()=>navigate('/app/home')}>
                        <p className='AppBillsPage_navbarText'>{currentTexts.appHome.user}</p>
                    </div>
                    <div id='AppBillsPage_navbarBills' onClick={()=>navigate('/app/bills')}>
                        <p className='AppBillsPage_navbarText'>{currentTexts.appHome.bills}</p>
                    </div>
                </div>
                <AppBillsListComponent/>
            </div>
        </div>
    )
}

export default AppBillsPage