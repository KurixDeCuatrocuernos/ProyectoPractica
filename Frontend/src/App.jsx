import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import './App.css'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import TestPage from './testConnection/Test'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import AppHomePage from './appPages/AppHomePage'
import { LanguageProvider } from "./context/LanguageContext"
import JudicialPage from "./pages/JudicialPage"
import LaboralPage from "./pages/LaboralPage"
import AboutUsPage from "./pages/AboutUsPage"
import ContactPage from "./pages/ContactPage"
import AppNewUser from "./appPages/AppNewUserPage"
import AppHeaderComponent from "./appComponents/AppHeaderComponent"
import AppBillsPage from "./appPages/AppBillsPage"
import AppShowUsers from "./appPages/AppShowUsersPage"
import AppNewBill from "./appPages/AppNewBillPage"
import AppAllBills from "./appPages/AppAllBillsPage"

function App() {
  const debug = import.meta.env.VITE_DEBUG_LOG
  const shouldShowLayout = location.pathname.startsWith('/app');

  const [isValidUser, setIsValidUser] = useState(false)

  const checkUser = async () => {
        console.log("se ha revisado el role del usuario")
        try {
            const response = await fetch('/check_user')
            if (response.ok) {
                const data = await response.json();
                if (data.status == 200) {
                    console.log("Usuario logueado con role válido")
                    setIsValidUser(true)
                } else {
                    setIsValidUser(false)
                    console.error("status: "+data.status+" error: "+data.message)
                }
            } else {
              setIsValidUser(false)
                console.error("response not ok")
            }
        } catch (error) {
            setIsValidUser(false)
            console.error(error)
        }
    }

    useEffect(() => {
      if (shouldShowLayout) checkUser()
    },[])

  return (<>
    <LanguageProvider>
      <Router>
      <header id="App_Header">
        {!shouldShowLayout && <HeaderComponent/>}
        {isValidUser && <AppHeaderComponent/>}
      </header>
      
      <section>
        {!shouldShowLayout ? 
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/judicial_services" element={<JudicialPage/>}/>
            <Route path="laboral_services" element={<LaboralPage/>}/>
            <Route path="/about_us" element={<AboutUsPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>

            <Route path="/connection" element={debug && <TestPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
          :
          <Routes>
            {isValidUser && <Route path="/app/" element={<AppHomePage />} />}
            {isValidUser && <Route path="/app/home" element={<Navigate to="/app/" replace />} />}
            {isValidUser && <Route path="/app/main" element={<Navigate to="/app/" replace />} />}
            {isValidUser && <Route path="/app/new_user" element={<AppNewUser />} />}
            {isValidUser && <Route path="/app/all_users" element= {<AppShowUsers />} />}
            {isValidUser && <Route path="/app/bills" element={<AppBillsPage />} />}
            {isValidUser && <Route path="/app/new_bills" element={<AppNewBill/>}/>}
            {isValidUser && <Route path="/app/view_bills" element={<AppAllBills />}/>}
            <Route path="*" element={<ErrorPage/>}/>
          </Routes> 
        }
       
      </section>
    
      <footer>
        {!shouldShowLayout && <FooterComponent />}
      </footer>
        
      </Router>
    </LanguageProvider>
  </>)

}

export default App
