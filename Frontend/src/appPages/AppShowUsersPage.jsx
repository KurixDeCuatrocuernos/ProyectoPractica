import { useState } from 'react'
import '../appStyles/AppShowUsersPage.css'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom'
import ShowUsersComponent from '../appComponents/AppShowUsersComponent.jsx'

function AppShowUsersPage() {

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
        <div id='AppShowUsers_container'>
            <div id='AppShowUsers_backgroundOverlay'>
                <div id='AppShowUsers_navbarContainer'>
                    <div className='AppShowUsers_navbarButton'>
                        <div className='AppShowUsers_buttonBackground' onClick={() => toggleUserInterface()}>
                            <p className='AppShowUsers_navbarText'>{currentTexts.appHome.user}</p>
                        </div>
                    </div>
                    {showUserInterface &&
                    <div className="AppShowUsers_navbarButton">
                        <div className='AppShowUsers_buttonBackground' onClick={() => navigate('/app/home')}>
                            <p className='AppShowUsers_navbarText'>{currentTexts.appHome.myData}</p>             
                        </div>
                    </div>
                    }
                    {showUserInterface && 
                    <div className="AppShowUsers_navbarButton">
                        <div className='AppShowUsers_buttonBackground' onClick={() => navigate('/app/new_user')}>
                            <p className='AppShowUsers_navbarText'>{currentTexts.appHome.newUser}</p>
                        </div>
                    </div>
                    }
                    {showUserInterface &&
                    <div className="AppShowUsers_navbarButton">
                        <div className='AppShowUsers_buttonBackground' style={{backgroundColor:'#5B627E'}}>
                            <p className='AppShowUsers_navbarText' style={{backgroundColor:'#5B627E'}}>{currentTexts.appHome.allUsers}</p>
                        </div>
                    </div>
                    }
                    <div className='AppShowUsers_navbarButton'>
                        <div className='AppShowUsers_buttonBackground' onClick={() => toggleBillsInterface()}>
                            <p className='AppShowUsers_navbarText'>{currentTexts.appHome.bills}</p>
                        </div>
                    </div>
                    {showBillsInterface &&
                    <div className="AppShowUsers_navbarButton">
                        <div className='AppShowUsers_buttonBackground' onClick={() => navigate('/app/bills')}>
                            <p className='AppShowUsers_navbarText'>{currentTexts.appHome.myBills}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppShowUsers_navbarButton">
                        <div className='AppShowUsers_buttonBackground' onClick={() => navigate('/app/new_bills')}>
                            <p className='AppShowUsers_navbarText'>{currentTexts.appHome.newBill}</p>
                        </div>
                    </div>
                    }
                    {showBillsInterface &&
                    <div className="AppShowUsers_navbarButton">
                        <div className='AppShowUsers_buttonBackground' onClick={()=> navigate('/app/view_bills')}>
                            <p className='AppShowUsers_navbarText'>{currentTexts.appHome.viewBills}</p>
                        </div>
                    </div>
                    }

                </div>
                <ShowUsersComponent/>
            </div>
        </div>
    )
}

export default AppShowUsersPage