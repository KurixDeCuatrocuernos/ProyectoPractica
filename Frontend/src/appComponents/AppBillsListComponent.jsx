import '../appStyles/AppBillsListComponent.css'
import { useLanguage } from '../context/LanguageContext'

function AppBillsListComponent() {

    const { currentTexts } = useLanguage();

    return (
        <div id="AppBillsList_container">
            <div id='AppBillsList_navbar'>
                <div id='AppBillsList_navbarMyData' onClick={() => navigate('/app/home')}>
                    <p className='AppBillsList_navbarText'>{currentTexts.appHome.myData}</p>
                </div>
                <div id='AppBillsList_navbarNewUser' onClick={() => navigate('/app/new_user')}>
                    <p className='AppNewUser_navbarText'>{currentTexts.appHome.newUser}</p>
                </div>
            </div>
            {/* Aquí se creará la lista con cada factura a mostrar */}
        </div>
    )
}

export default AppBillsListComponent