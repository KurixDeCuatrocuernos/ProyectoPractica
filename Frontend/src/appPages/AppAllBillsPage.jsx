import { useNavigate } from 'react-router-dom';
import '../appStyles/AppAllBillsPage.css'
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import AllBills from '../appComponents/AppAllBillsComponent'

function AppAllBillsPage() {
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

    return(
        <div id="AppAllBillsPage_container">
            <div id='AppAllBillsPage_backgroundOverlay'>
                <div id='AppAllBillsPage_navbarContainer'>
                    <div className='AppAllBillsPage_navbarButton'>
                        <div className='AppAllBillsPage_buttonBackground' onClick={() => toggleUserInterface()}>
                            <p className='AppAllBillsPage_navbarText'>{currentTexts.appHome.user}</p>
                        </div>
                    </div>
                    {showUserInterface &&
                    <div className="AppAllBillsPage_navbarButton">
                        <div className='AppAllBillsPage_buttonBackground' onClick={() => navigate('/app/home')}>
                            <p className='AppAllBillsPage_navbarText'>{currentTexts.appHome.myData}</p>             
                        </div>
                    </div>
                    }
                    {showUserInterface && 
                    <div className="AppAllBillsPage_navbarButton">
                        <div className='AppAllBillsPage_buttonBackground' onClick={() => navigate('/app/new_user')}>
                            <p className='AppAllBillsPage_navbarText'>{currentTexts.appHome.newUser}</p>
                        </div>
                    </div>
                    }
                    {showUserInterface &&
                    <div className="AppAllBillsPage_navbarButton">
                        <div className='AppAllBillsPage_buttonBackground' onClick={() => navigate('/app/all_users')}>
                            <p className='AppAllBillsPage_navbarText'>{currentTexts.appHome.allUsers}</p>
                        </div>
                    </div>
                    }
                    <div className='AppAllBillsPage_navbarButton'>
                        <div className='AppAllBillsPage_buttonBackground' onClick={() => toggleBillsInterface()}>
                            <p className='AppAllBillsPage_navbarText'>{currentTexts.appHome.bills}</p>
                        </div>
                    </div>
                    {showBillsInterface &&
                    <div className="AppAllBillsPage_navbarButton">
                        <div className='AppAllBillsPage_buttonBackground' onClick={() => navigate('/app/bills')}>
                            <p className='AppAllBillsPage_navbarText'>{currentTexts.appHome.myBills}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppAllBillsPage_navbarButton">
                        <div className='AppAllBillsPage_buttonBackground' onClick={() => navigate('/app/new_bills')}>
                            <p className='AppAllBillsPage_navbarText'>{currentTexts.appHome.newBill}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppAllBillsPage_navbarButton">
                        <div className='AppAllBillsPage_buttonBackground' style={{backgroundColor:'#5B627E'}}>
                            <p className='AppAllBillsPage_navbarText' style={{backgroundColor:'#5B627E'}}>{currentTexts.appHome.viewBills}</p>
                        </div>
                    </div>
                    }
                </div>
                <AllBills/>
            </div>
        </div>
    )
}

export default AppAllBillsPage