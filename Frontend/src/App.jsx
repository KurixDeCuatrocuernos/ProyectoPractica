import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeaderComponent/>

      <HomePage/>

      <FooterComponent/>
    </>
  )
}

export default App
