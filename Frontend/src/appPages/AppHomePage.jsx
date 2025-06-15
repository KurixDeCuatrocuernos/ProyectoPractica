import '../appStyles/AppHomePage.css'
import { useLanguage } from '../context/LanguageContext.jsx';
import AppMyDataComponent from '../appComponents/AppMyDataComponent.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AppHomePage() {

    const { currentTexts } = useLanguage()
    const navigate = useNavigate();
    const [showUserInterface, setShowUserInterface] = useState(true)
    const [showBillsInterface, setShowBillsInterface] = useState(false)

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

    return(
        <div id="AppHomePage_container">
            <div id='AppHomePage_backgroundOverlay'>
                <div id='AppHomePage_navbarContainer'>
                    <div className='AppHomePage_navbarButton'>
                        <div className='AppHomePage_buttonBackground' onClick={() => toggleUserInterface()}>
                            <p className='AppHomePage_navbarText'>{currentTexts.appHome.user}</p>
                        </div>
                    </div>
                    {showUserInterface &&
                    <div className="AppHomePage_navbarButton">
                        <div className='AppHomePage_buttonBackground' style={{backgroundColor:'#5B627E'}}>
                            <p className='AppHomePage_navbarText' style={{backgroundColor:'#5B627E'}}>{currentTexts.appHome.myData}</p>             
                        </div>
                    </div>
                    }
                    {showUserInterface && 
                    <div className="AppHomePage_navbarButton">
                        <div className='AppHomePage_buttonBackground' onClick={() => navigate('/app/new_user')}>
                            <p className='AppHomePage_navbarText'>{currentTexts.appHome.newUser}</p>
                        </div>
                    </div>
                    }
                    {showUserInterface &&
                    <div className="AppHomePage_navbarButton">
                        <div className='AppHomePage_buttonBackground' onClick={() => navigate('/app/all_users')}>
                            <p className='AppHomePage_navbarText'>{currentTexts.appHome.allUsers}</p>
                        </div>
                    </div>
                    }
                    <div className='AppHomePage_navbarButton'>
                        <div className='AppHomePage_buttonBackground' onClick={() => toggleBillsInterface()}>
                            <p className='AppHomePage_navbarText'>{currentTexts.appHome.bills}</p>
                        </div>
                    </div>
                    {showBillsInterface &&
                    <div className="AppHomePage_navbarButton">
                        <div className='AppHomePage_buttonBackground' onClick={() => navigate('/app/bills')}>
                            <p className='AppHomePage_navbarText'>{currentTexts.appHome.myBills}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppHomePage_navbarButton">
                        <div className='AppHomePage_buttonBackground' onClick={() => navigate('/app/new_bills')}>
                            <p className='AppHomePage_navbarText'>{currentTexts.appHome.newBill}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppHomePage_navbarButton">
                        <div className='AppHomePage_buttonBackground' onClick={()=> navigate('/app/view_bills')}>
                            <p className='AppHomePage_navbarText'>{currentTexts.appHome.viewBills}</p>
                        </div>
                    </div>
                    }
                    
                </div>
                <AppMyDataComponent/>
            </div>
        </div>
    );
}

export default AppHomePage;