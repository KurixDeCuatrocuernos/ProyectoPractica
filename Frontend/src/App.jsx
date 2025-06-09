import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"
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

function App() {
  const debug = import.meta.env.VITE_DEBUG_LOG
  const shouldShowLayout = location.pathname.startsWith('/app');

  return (<>
    <LanguageProvider>
      <Router>
      <header id="App_Header">
        {!shouldShowLayout && <HeaderComponent/>}
      </header>
      
      <section>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/judicial_services" element={<JudicialPage/>}/>
          <Route path="laboral_services" element={<LaboralPage/>}/>
          <Route path="/about_us" element={<AboutUsPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>

          <Route path="/connection" element={debug && <TestPage/>}/>
            
          <Route path="/app/main" element={<AppHomePage/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </section>
    
      <footer>
        {!shouldShowLayout && <FooterComponent />}
      </footer>
        
      </Router>
    </LanguageProvider>
  </>)

}

export default App
