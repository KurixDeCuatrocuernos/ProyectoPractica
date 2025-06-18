import { useEffect, useState } from 'react'
import '../appStyles/AppFilterTypeComponent.css'
import { useLanguage } from '../context/LanguageContext'

function AppFilterTypeComponent({ setType }) {

    const {language, currentTexts} = useLanguage()
    const [types, setTypes] = useState([])
    
    const getTypes = async() => {
        try {
            const response = await fetch('/get_types', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', }
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setTypes(data.types)
                } else {
                    if (language==='textEs') {
                        console.log(data.mensaje)
                    } else {
                        console.log(data.message)
                    }
                }
            } else {
                console.log("Response is not ok!")
            }
        } catch (error) {
            console.log("Hubo un problema al conectar con la API: "+error)
        }
    }

    useEffect(() => {
        getTypes()
    }, [])

    return(
        <div id='FilterType_container'>
            <h2 id='FilterType_title'>{currentTexts.typeFilter.title}</h2>
            <select id="FilterType_select" name="Este es el filtro de fechas" onChange={(event) => setType(event.target.value)} defaultValue="">
                <option className='FilterType_option' value="" default>{currentTexts.typeFilter.selectType}</option>
                {
                    types.map(type => {
                        const filteredType = type.name.charAt(0).toUpperCase() + type.name.slice(1).toLowerCase();
                        return (
                            <option className='FilterType_option' key={type.id} value={type.name}>{filteredType}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}
export default AppFilterTypeComponent