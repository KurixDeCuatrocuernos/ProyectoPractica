import { useNavigate } from 'react-router-dom'
import AppBillsListComponent from '../appComponents/AppBillsListComponent'
import '../appStyles/AppBillsPage.css'
import { useLanguage } from '../context/LanguageContext'
import { useState } from 'react'


function AppBillsPage() {

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
        <div id="AppBillsPage_container">
            <div id='AppBillsPage_backgroundOverlay'>
                <div id='AppBillsPage_navbarContainer'>
                    <div className='AppBillsPage_navbarButton'>
                        <div className='AppBillsPage_buttonBackground' onClick={() => toggleUserInterface()}>
                            <p className='AppBillsPage_navbarText'>{currentTexts.appHome.user}</p>
                        </div>
                    </div>
                    {showUserInterface &&
                    <div className="AppBillsPage_navbarButton">
                        <div className='AppBillsPage_buttonBackground' onClick={() => navigate('/app/home')}>
                            <p className='AppBillsPage_navbarText'>{currentTexts.appHome.myData}</p>             
                        </div>
                    </div>
                    }
                    {showUserInterface && 
                    <div className="AppBillsPage_navbarButton">
                        <div className='AppBillsPage_buttonBackground' onClick={() => navigate('/app/new_user')}>
                            <p className='AppBillsPage_navbarText'>{currentTexts.appHome.newUser}</p>
                        </div>
                    </div>
                    }
                    {showUserInterface &&
                    <div className="AppBillsPage_navbarButton">
                        <div className='AppBillsPage_buttonBackground' onClick={() => navigate('/app/all_users')}>
                            <p className='AppBillsPage_navbarText'>{currentTexts.appHome.allUsers}</p>
                        </div>
                    </div>
                    }
                    <div className='AppBillsPage_navbarButton'>
                        <div className='AppBillsPage_buttonBackground' onClick={() => toggleBillsInterface()}>
                            <p className='AppBillsPage_navbarText'>{currentTexts.appHome.bills}</p>
                        </div>
                    </div>
                    {showBillsInterface &&
                    <div className="AppBillsPage_navbarButton">
                        <div className='AppBillsPage_buttonBackground' style={{backgroundColor:'#5B627E'}}>
                            <p className='AppBillsPage_navbarText' style={{backgroundColor:'#5B627E'}}>{currentTexts.appHome.myBills}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppBillsPage_navbarButton">
                        <div className='AppBillsPage_buttonBackground' onClick={() => navigate('/app/new_bills')}>
                            <p className='AppBillsPage_navbarText'>{currentTexts.appHome.newBill}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppBillsPage_navbarButton">
                        <div className='AppBillsPage_buttonBackground' onClick={()=> navigate('/app/view_bills')}>
                            <p className='AppBillsPage_navbarText'>{currentTexts.appHome.viewBills}</p>
                        </div>
                    </div>
                    }
                    
                </div>
                <AppBillsListComponent/>
            </div>
        </div>
    )
}

export default AppBillsPage