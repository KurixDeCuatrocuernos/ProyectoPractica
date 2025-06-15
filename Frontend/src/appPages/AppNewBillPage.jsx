import { useNavigate } from 'react-router-dom';
import '../appStyles/AppNewBillPage.css'
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

function AppNewBillPage() {

    const { currentTexts } = useLanguage()
    const navigate = useNavigate();
    const [showUserInterface, setShowUserInterface] = useState(false)
    const [showBillsInterface, setShowBillsInterface] = useState(true)

    const toggleUserInterface = () => {
        if (showUserInterface === true) {
            setShowUserInterface(false) 
        } else { 
            setShowUserInterface(true)
            setShowBillsInterface(false)
        }
    }

    const toggleBillsInterface = () => {
        if (showBillsInterface === true) {
            setShowBillsInterface(false) 
        } else {
            setShowBillsInterface(true)
            setShowUserInterface(false)
        }
    }

    return (
        <div id='AppNewBillPage_container'>
                        <div id='AppNewBillPage_backgroundOverlay'>
                <div id='AppNewBillPage_navbarContainer'>
                    <div className='AppNewBillPage_navbarButton'>
                        <div className='AppNewBillPage_buttonBackground' onClick={() => toggleUserInterface()}>
                            <p className='AppNewBillPage_navbarText'>{currentTexts.appHome.user}</p>
                        </div>
                    </div>
                    {showUserInterface &&
                    <div className="AppNewBillPage_navbarButton">
                        <div className='AppNewBillPage_buttonBackground' onClick={() => navigate('/app/home')}>
                            <p className='AppNewBillPage_navbarText'>{currentTexts.appHome.myData}</p>             
                        </div>
                    </div>
                    }
                    {showUserInterface && 
                    <div className="AppNewBillPage_navbarButton">
                        <div className='AppNewBillPage_buttonBackground' onClick={() => navigate('/app/new_user')}>
                            <p className='AppNewBillPage_navbarText'>{currentTexts.appHome.newUser}</p>
                        </div>
                    </div>
                    }
                    {showUserInterface &&
                    <div className="AppNewBillPage_navbarButton">
                        <div className='AppNewBillPage_buttonBackground' onClick={() => navigate('/app/all_users')}>
                            <p className='AppNewBillPage_navbarText'>{currentTexts.appHome.allUsers}</p>
                        </div>
                    </div>
                    }
                    <div className='AppNewBillPage_navbarButton'>
                        <div className='AppNewBillPage_buttonBackground' onClick={() => toggleBillsInterface()}>
                            <p className='AppNewBillPage_navbarText'>{currentTexts.appHome.bills}</p>
                        </div>
                    </div>
                    {showBillsInterface &&
                    <div className="AppNewBillPage_navbarButton">
                        <div className='AppNewBillPage_buttonBackground' onClick={() => navigate('/app/bills')}>
                            <p className='AppNewBillPage_navbarText' >{currentTexts.appHome.myBills}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppNewBillPage_navbarButton">
                        <div className='AppNewBillPage_buttonBackground' style={{backgroundColor:'#5B627E'}}>
                            <p className='AppNewBillPage_navbarText' style={{backgroundColor:'#5B627E'}}>{currentTexts.appHome.newBill}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppNewBillPage_navbarButton">
                        <div className='AppNewBillPage_buttonBackground' onClick={()=> navigate('/app/view_bills')}>
                            <p className='AppNewBillPage_navbarText'>{currentTexts.appHome.viewBills}</p>
                        </div>
                    </div>
                    }
                    
                </div>
                {/* AQUÏ VA EL COMPONENTE CON TODA LA LÖGICA */}
            </div>
        </div>
    )
}

export default AppNewBillPage