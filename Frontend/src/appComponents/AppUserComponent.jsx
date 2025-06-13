import '../appStyles/AppUserComponent.css'

function AppUserComponent({ id, name, email, role, confirmed }) {
    return(
        <>
        <tr id='AppUserComponent_container'>
            <td className='AppUserComponent_userData'>{id}</td>
            <td className='AppUserComponent_userData'>{name}</td>
            <td className='AppUserComponent_userData'>{email}</td>
            <td className='AppUserComponent_userData'>{role}</td>
            <td className='AppUserComponent_userData'>{confirmed}</td>
            <td id='AppUserComponent_actions'>
                <h2 className='AppUserComponent_action'>Edit</h2>
                <h2 className='AppUserComponent_action'>Download</h2>
                <h2 className='AppUserComponent_action'>Delete</h2>
            </td>
        </tr>
        </>
    )
}

export default AppUserComponent