import { useEffect, useState } from 'react'
import '../appStyles/AppFilterRoleComponent.css'
import { useLanguage } from '../context/LanguageContext'

function AppFilterRoleComponent({ setRole }) {

    const {language, currentTexts} = useLanguage()
    const [roles, setRoles] = useState([])

    const getRoles = async() => {
        try {
            const response = await fetch ('/get_roles', {
                method:'POST',
                headers: { 'Content-Type': 'application/json', }
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setRoles(data.roles);
                } else {
                    if(language==='textEs'){
                        console.log(data.mensaje)
                    } else {
                        console.log(data.message)
                    }
                }
            } else {
                console.log("Response is not ok")
            }
        } catch (error) {
            console.log("Hubo un error al conectar con la API: "+error)
        }
    }

    useEffect(()=>{
        getRoles()
    },[])
     
    return (
        <div id="FilterRole_container">
            <h2 id="FilterRole_title">{currentTexts.roleFilter.title}</h2>
            <select id="FilterRole_select" onChange={(event)=>setRole(event.target.value)} defaultValue="">
                <option className='FilterRole_option' value="" default>{currentTexts.roleFilter.selectRole}</option>
                {
                    roles.filter(role => !role.value.endsWith("NULL")).map(role => {
                        const filteredRole = role.value.replace(/^ROLE_/, "")
                                                        .charAt(0).toUpperCase() + 
                                            role.value.replace(/^ROLE_/, "").slice(1).toLowerCase();
                        
                        return (
                            <option key={role.value} className='FilterRole_option' value={role.value}>
                                {filteredRole}
                            </option>
                        );
                    })
                /*
                <option className='FilterRole_option' value="" >{currentTexts.roleFilter.selectRole}</option>
                <option className='FilterRole_option' value="ROLE_USER">{currentTexts.roleFilter.user}</option>
                <option className='FilterRole_option' value="ROLE_ADVISOR">{currentTexts.roleFilter.advisor}</option>
                <option className='FilterRole_option' value="ROLE_ADMIN">{currentTexts.roleFilter.admin}</option>
                */}
            </select>
        </div>
    )
}
export default AppFilterRoleComponent