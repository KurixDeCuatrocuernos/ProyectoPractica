import '../appStyles/AppBillsListComponent.css'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom';

function AppBillsListComponent() {

    const { currentTexts } = useLanguage();
    const navigate = useNavigate();

    return (
        <div id="AppBillsList_container">
            <div id='AppBillsList_navbar'>
                <div id='AppBillsList_navbarMyData' onClick={() => navigate('/app/bills')}>
                    <p className='AppBillsList_navbarText'>{currentTexts.appBills.myBills}</p>
                </div>
                <div id='AppBillsList_navbarNewUser' onClick={() => navigate('/app/newBill')}>
                    <p className='AppNewUser_navbarText'>{currentTexts.appBills.newBill}</p>
                </div>
            </div>
            {/* Aquí se creará la lista con cada factura a mostrar */}
        </div>
    )
}

export default AppBillsListComponent