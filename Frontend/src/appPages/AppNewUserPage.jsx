import { useState } from 'react';
import AppNewUserComponent from '../appComponents/AppNewUserComponent';
import '../appStyles/AppNewUserPage.css'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom';

function AppNewUserPage() {

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
        <div id="AppNewUserPage_container">
            <div id='AppNewUserPage_backgroundOverlay'>
                <div id='AppNewUserPage_navbarContainer'>
                    <div className='AppNewUserPage_navbarButton'>
                        <div className='AppNewUserPage_buttonBackground' onClick={() => toggleUserInterface()}>
                            <p className='AppNewUserPage_navbarText'>{currentTexts.appHome.user}</p>
                        </div>
                    </div>
                    {showUserInterface &&
                    <div className="AppNewUserPage_navbarButton">
                        <div className='AppNewUserPage_buttonBackground'  onClick={() => navigate('/app/home')}>
                            <p className='AppNewUserPage_navbarText'>{currentTexts.appHome.myData}</p>             
                        </div>
                    </div>
                    }
                    {showUserInterface && 
                    <div className="AppNewUserPage_navbarButton">
                        <div className='AppNewUserPage_buttonBackground' style={{backgroundColor:'#5B627E'}}>
                            <p className='AppNewUserPage_navbarText' style={{backgroundColor:'#5B627E'}}>{currentTexts.appHome.newUser}</p>
                        </div>
                    </div>
                    }
                    {showUserInterface &&
                    <div className="AppNewUserPage_navbarButton">
                        <div className='AppNewUserPage_buttonBackground' onClick={() => navigate('/app/all_users')}>
                            <p className='AppNewUserPage_navbarText'>{currentTexts.appHome.allUsers}</p>
                        </div>
                    </div>
                    }
                    <div className='AppNewUserPage_navbarButton'>
                        <div className='AppNewUserPage_buttonBackground' onClick={() => toggleBillsInterface()}>
                            <p className='AppNewUserPage_navbarText'>{currentTexts.appHome.bills}</p>
                        </div>
                    </div>
                    {showBillsInterface &&
                    <div className="AppNewUserPage_navbarButton">
                        <div className='AppNewUserPage_buttonBackground' onClick={() => navigate('/app/bills')}>
                            <p className='AppNewUserPage_navbarText'>{currentTexts.appHome.myBills}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppNewUserPage_navbarButton">
                        <div className='AppNewUserPage_buttonBackground' onClick={() => navigate('/app/new_bills')}>
                            <p className='AppNewUserPage_navbarText'>{currentTexts.appHome.newBill}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppNewUserPage_navbarButton">
                        <div className='AppNewUserPage_buttonBackground' onClick={()=> navigate('/app/view_bills')}>
                            <p className='AppNewUserPage_navbarText'>{currentTexts.appHome.viewBills}</p>
                        </div>
                    </div>
                    }
                    
                </div>
                <AppNewUserComponent/>
            </div>
        </div>
    )
}
export default AppNewUserPage