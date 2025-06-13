import { useEffect, useState } from 'react'
import '../appStyles/AppShowUsersComponent.css'
import { useLanguage } from '../context/LanguageContext'
import SearchBar from './SearchBar'
import RoleFilter from './AppFilterRoleComponent'
import AppFilterTypeComponent from './AppFilterTypeComponent'
import AppUserComponent from './AppUserComponent'

function AppShowUsersComponent () {

    const { language } = useLanguage()
    const [users, setUsers] = useState([])

    const getUsers = async() => {
        try {
            const response = await fetch('/get_all_users', {
                method: 'POST',
                headers: {  'Content-Type': 'application/json', },
            });
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setUsers(data.users)
                } else {
                    if (language === 'textEs') {
                        console.log(data.mensaje)
                    } else {
                        console.log(data.message)
                    }
                }
            } else {
                console.log("response is not ok!")
            }

        } catch (error) {
            console.log("There was a problen connecting with the API")
        }
    }

    useEffect(() => {
        getUsers()
    }, []);

    return (
        <div id='AppShowUsersComponent_container'>
            <div id='AppShowUsersComponent_filtersContainer'>
                <SearchBar/>
                <RoleFilter/>
            </div>
            <div id='AppShowUsersComponent_usersContainer'>
                <table id='AppShowUsersComponent_table'>
                    <thead>
                        <tr className='AppShowUsersComponent_tableRow'>
                            <th className="AppShowUsersComponent_title">Id</th>
                            <th className="AppShowUsersComponent_title">Nombre</th>
                            <th className="AppShowUsersComponent_title">Correo Electrónico</th>
                            <th className="AppShowUsersComponent_title">Rol</th>
                            <th className="AppShowUsersComponent_title">Verificado</th>
                            <th className="AppShowUsersComponent_title">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <AppUserComponent key={user.id} id={user.id} name={user.name} email={user.email} role={user.role} confirmed={user.confirmed}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AppShowUsersComponent