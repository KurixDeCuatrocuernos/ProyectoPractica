import { useState } from 'react'
import '../appStyles/AppFilterTypeComponent.css'
import { useLanguage } from '../context/LanguageContext'

function AppFilterTypeComponent() {

    const {currentTexts} = useLanguage()
    const [type, setType] = useState('')

    return(
        <div id='FilterType_container'>
            <h2 id='FilterType_title'>{currentTexts.typeFilter.title}</h2>
            <select id="FilterType_select" name="Este es el filtro de fechas" onChange={(event) => setType(event.target.value)} defaultValue="">
                <option value="" disabled hidden>{currentTexts.typeFilter.selectType}</option>
                <option className='FilterType_option' value="client">{currentTexts.typeFilter.client}</option>
                <option className='FilterType_option' value="provider">{currentTexts.typeFilter.provider}</option>
                <option className='FilterType_option' value="cost">{currentTexts.typeFilter.cost}</option>
            </select>
        </div>
    )
}
export default AppFilterTypeComponent