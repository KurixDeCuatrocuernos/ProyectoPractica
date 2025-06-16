import { useState } from 'react'
import '../appStyles/AppFilterRoleComponent.css'
import { useLanguage } from '../context/LanguageContext'

function AppFilterRoleComponent({ setRole }) {

    const {currentTexts} = useLanguage()

    return (
        <div id="FilterRole_container">
            <h2 id="FilterRole_title">{currentTexts.roleFilter.title}</h2>
            <select id="FilterRole_select" onChange={(event)=>setRole(event.target.value)} defaultValue="">
                <option className='FilterRole_option' value="" >{currentTexts.roleFilter.selectRole}</option>
                <option className='FilterRole_option' value="ROLE_USER">{currentTexts.roleFilter.user}</option>
                <option className='FilterRole_option' value="ROLE_ADVISOR">{currentTexts.roleFilter.advisor}</option>
                <option className='FilterRole_option' value="ROLE_ADMIN">{currentTexts.roleFilter.admin}</option>
            </select>
        </div>
    )
}
export default AppFilterRoleComponent