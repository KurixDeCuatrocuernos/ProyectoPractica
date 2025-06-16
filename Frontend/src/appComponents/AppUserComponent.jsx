import { useEffect, useState } from 'react'
import '../appStyles/AppUserComponent.css'

function AppUserComponent({ id, name, email, role, confirmed }) {

    const [roleText, setRoleText] = useState('Sin Role');

    useEffect(()=>{
        if(role.endsWith("USER")) {
            setRoleText("USER")
        } else if (role.endsWith("ADVISOR")) {
            setRoleText("ADVISOR")
        } else if (role.endsWith("ADMIN")) {
            setRoleText("ADMIN")
        }
    },[])

    return(
        <tr id='AppUserComponent_container'>
            <td className='AppUserComponent_userData'>{id}</td>
            <td className='AppUserComponent_userData'>{name}</td>
            <td className='AppUserComponent_userData'>{email}</td>
            <td className='AppUserComponent_userData'>{roleText}</td>
            <td className='AppUserComponent_userData'>{confirmed}</td>
            <td id='AppUserComponent_actions'>
                <h2 className='AppUserComponent_action'>Edit</h2>
                <h2 className='AppUserComponent_action'>Download</h2>
                <h2 className='AppUserComponent_action'>Delete</h2>
            </td>
        </tr>
    )
}

export default AppUserComponent