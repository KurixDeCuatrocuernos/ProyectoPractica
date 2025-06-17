import { useEffect, useState } from 'react'
import '../appStyles/AppShowUsersComponent.css'
import { useLanguage } from '../context/LanguageContext'
import SearchBar from './SearchBar'
import RoleFilter from './AppFilterRoleComponent'
import AppFilterTypeComponent from './AppFilterTypeComponent'
import AppUserComponent from './AppUserComponent'
import Bill from './AppBillComponent'

function AppShowUsersComponent () {

    /* Aquí deben recogerse todos los usuarios y mandarlos AppUserComponent que debe mostrarlos */
    /* Sería preciso ver cómo el filtro puede limitar cuáles se muestran de esos que se han recogido */
    /* Por ejemplo, mediante un if en el .map() */

    const { language, currentTexts } = useLanguage()
    const [users, setUsers] = useState([])

    const [search, setSearch] = useState('')
    const [role, setRole] = useState('')

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
                <SearchBar setSearch={setSearch}/>
                <RoleFilter setRole={setRole}/>
            </div>
            {/* Esto permite ver que los filtros funcionan
            <h1>Se ha buscado: {search}</h1>
            <h1>Se ha elegido el role: {role}</h1>
            */}
            <div id='AppShowUsersComponent_usersContainer'>
                <table id='AppShowUsersComponent_table'>
                    <thead>
                        <tr className='AppShowUsersComponent_tableRow'>
                            <th className="AppShowUsersComponent_title">{currentTexts.appShowUsersComponent.title1}</th>
                            <th className="AppShowUsersComponent_title">{currentTexts.appShowUsersComponent.title2}</th>
                            <th className="AppShowUsersComponent_title">{currentTexts.appShowUsersComponent.title3}</th>
                            <th className="AppShowUsersComponent_title">{currentTexts.appShowUsersComponent.title4}</th>
                            <th className="AppShowUsersComponent_title">{currentTexts.appShowUsersComponent.title5}</th>
                            <th className="AppShowUsersComponent_title">{currentTexts.appShowUsersComponent.title6}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        users
                            .filter(user =>
                                search === "" || 
                                user.name.toLowerCase().includes(search.toLowerCase()) || 
                                user.email.toLowerCase().includes(search.toLowerCase()) || 
                                user.role.toLowerCase().includes(search.toLowerCase()) ||
                                user.id.toString().toLowerCase().includes(search.toLowerCase())
                            ) // Primero filtramos por búsqueda
                            .filter(user => role === "" || user.role === role) // Luego filtramos por rol solo en los resultados de arriba
                            .map(user => (
                                <AppUserComponent key={user.id} id={user.id} name={user.name} email={user.email} role={user.role} confirmed={user.confirmed}/>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AppShowUsersComponent