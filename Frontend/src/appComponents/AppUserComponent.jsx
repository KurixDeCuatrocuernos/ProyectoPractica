import { useEffect, useState } from 'react'
import '../appStyles/AppUserComponent.css'
import { useLanguage } from '../context/LanguageContext';

function AppUserComponent({ id, name, email, role, confirmed, onEdit }) {

    const { language, currentTexts } = useLanguage()
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

    const confirmDeletion = () => {
        var isDeleting = window.confirm("¿Estás seguro de que deseas borrar este usuario?");
        (isDeleting) ? deleteUser(id) : console.log("Borrado cancelado")
    }

    const deleteUser = async(id) => {
        try{
            const response = await fetch('/delete_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id
                })
            })
            if (response.ok) {
                const data = await response.json();
                if (data.status === 200) {
                    window.location.reload()
                    // Se podría añadir una pregunta para borrar también las facturas
                } else {
                    (language === 'textEs') ? console.log(data.mensaje) : console.log(data.message)
                }
            } else {
                console.log("Response is not Ok!")
            }
        } catch (error) {
            console.log('Hubo un problema al conectar con la API')
        } 
    }

    return(
        <tr id='AppUserComponent_container'>
            <td className='AppUserComponent_userData'>{id}</td>
            <td className='AppUserComponent_userData'>{name ?? 'Sin Nombre'}</td>
            <td className='AppUserComponent_userData'>{email ?? 'Sin Email'}</td>
            <td className='AppUserComponent_userData'>{roleText}</td>
            <td className='AppUserComponent_userData'>{confirmed}</td>
            <td id='AppUserComponent_actions'>
                <h2 className='AppUserComponent_action' onClick={onEdit}>Edit</h2>
                <h2 className='AppUserComponent_action' onClick={() => confirmDeletion()}>Delete</h2>
            </td>
        </tr>
    )
}

export default AppUserComponent