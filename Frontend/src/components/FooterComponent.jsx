import { useState } from 'react'
import '../styles/FooterComponent.css'

function FooterComponent() {

    const [texto, setTexto] = useState("Este es el Footer")
    
    return (
        <>
            <h1>{texto}</h1>
        </>
    )
}

export default FooterComponent