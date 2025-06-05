import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"
import './App.css'
import HomePage from './pages/HomePage'
import ErrorPage from "./pages/ErrorPage"
import TestPage from './testConnection/Test'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import AppHomePage from "./appPages/AppHomePage"

function App() {
  const debug = import.meta.env.VITE_DEBUG_LOG
  const shouldShowLayout = location.pathname.startsWith('/app');

  return (<>
    {!shouldShowLayout && <HeaderComponent/>}
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="/connection" element={debug && <TestPage/>}/>
        
        <Route path="/app/main" element={<AppHomePage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
    {!shouldShowLayout && <FooterComponent />}
  </>);

}

export default App
