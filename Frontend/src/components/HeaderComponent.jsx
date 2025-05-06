import { useState } from 'react'
import '../styles/HeaderComponent.css'

function HeaderComponent() {

    const [texto, setTexto] = useState("Este es el Header")

    return (
        <>
            <h1>{texto}</h1>   
        </>
    )
}

export default HeaderComponent