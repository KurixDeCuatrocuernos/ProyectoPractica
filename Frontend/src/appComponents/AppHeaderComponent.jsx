import '../appStyles/AppHeaderComponent.css'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import spain from '../assets/SpainFlag.png'
import uk from '../assets/UnitedKingdomFlag.png'
import mail from '../assets/MailIcon.png'
import salir from '../assets/salida.png'
import userImage from '../assets/LogoAndresEscudero2.jpeg'
import { useNavigate } from 'react-router-dom'

function AppHeaderComponent() {
    const[flag, setFlag] = useState(spain);
    const { language, toggleLanguage, currentTexts } = useLanguage();
    const navigate = useNavigate();
    const [billsToPublic, setBillsToPublic] = useState(false);

    const setLanguage = async() => {
        toggleLanguage();
        if (flag===spain) {
            setFlag(uk);    
        } else {
            setFlag(spain);
        }     
    }

    const [userName, setUserName] = useState('Nombre de Usuario')

    const setName = async() => {
        try {
            const response = await fetch('/get_current_name')
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setUserName(data.name);
                } else {
                    if (language === 'textEs') {
                        console.log(data.mensaje)
                    } else {
                        console.log(data.message)
                    }
                }
            } else {
                console.log("The response is not Ok!")
            }
        } catch (error) {
            console.log("There was a problem connecting with the API")
        }
    }

    const logout = async() => {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        try {
            const data = await response.json()
            if (data.status==200) {
                window.location.href='/home'
            } else {
                if (currentTexts == 'TextEs') {
                    console.error(data.mensaje)
                } else {
                    console.error(data.message)
                }
            }
        } catch (error) {
            console.log("There was a problem connecting with the API")
        }
    }

    const checkBills = async() => {
        const response = await fetch('/check_bills')
        try {
            const data = await response.json()
            if (data.status==200) {
                setBillsToPublic(data.result)
            } else {
                if (currentTexts == 'TextEs') {
                    console.error(data.mensaje)
                } else {
                    console.error(data.message)
                }
            }
        } catch (error) {
            console.log("There was a problem connecting with the API")
        }
    }

    useEffect(()=>{
        setName();
        checkBills();
    },[])
        
    return(
        <div id='AppHeader_container'>
            <div id='AppHeader_title' onClick={() => navigate('/app/home')}>
                <img id='AppHeader_userImage' src={userImage} alt="User's Image" />
                <h2 id='AppHeader_userName'>{userName}</h2>
            </div>
            <div id='AppHeader_languageContainer'>
                <img id='Appheader_language_img' src={flag} alt='country language flag' onClick={setLanguage}/>
            </div>
            {
                billsToPublic === true ?
                <div id='AppHeader_label' onClick={() => navigate('/app/new_bills')}>
                    <img id='AppHeader_mailIcon'src={mail} alt="Mail Icon from FlatIcon" />
                    {/*Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a>*/}
                    <p id='AppHeader_mailText'>{currentTexts.appHeader.mailText1}<br/>{currentTexts.appHeader.mailText2}</p>
                </div>
                :
                ''
            }
            <div id='AppHeader_button_container' onClick={() => logout()}>
                <p id='AppHeader_buttonText'>{currentTexts.appHeader.logout}</p>
                <img id='AppHeader_logoutIcon' src={salir} alt="Logout Icon from FlatIcon" />
                {/*Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a>*/}
                <div id='AppHeader_leftButton'></div>
                <div id='AppHeader_centerButton'></div>
                <div id='AppHeader_rightButton'></div>
            </div>
        </div>
    )
}

export default AppHeaderComponent