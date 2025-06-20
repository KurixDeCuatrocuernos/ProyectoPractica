import '../appStyles/AppEditUserFormComponent.css'
import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import Validate from '../utils/Validate'

function AppEditUserFormComponent({ show, handleClose, user }) {
    
    const { language, currentTexts } = useLanguage()
    const [currentRoles, setCurrentRoles] = useState([])
    const { isValidEmail, isValidPassword, isValidName, isValidRole } = Validate();
    const [isValidForm, setIsValidForm] = useState(true)
    
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] = useState('')
    const [newRole, setNewRole] = useState('')

    const [idError, setIdError] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passError, setPassError] = useState('')
    const [rolesError, setRolesError] = useState('')

    const checkData = async() => {
        var modifiedPassword = false;
        
        if (isValidName(name) !== null) {
            setIsValidForm(false)
            setNameError(isValidName(name))
        }

        if (isValidEmail(email) !== null) {
            setIsValidForm(false)
            setEmailError(isValidEmail(email))
        }

        if (password !== '') {
            modifiedPassword = true
            if (isValidPassword(password)) {
                setIsValidForm(false)
                setPassError(isValidPassword(password))
            }
        }

        if (String(roles) === "0") {
            if (isValidRole(newRole.toLocaleUpperCase())) {
                setIsValidForm(false)
                setRolesError(isValidRole(newRole))
            }
        }

        console.log("Role elegido: "+roles)
        console.log("formulario: "+isValidForm)

        if (isValidForm===true) {
            
            if(String(roles) === "0") {
                const fullRole = `ROLE_${newRole.toUpperCase()}`;
                const roleCreated = await createRole(fullRole);
                if (!roleCreated) { 
                    return; 
                } else {
                   await updateUser(modifiedPassword)
                } // Se debería mandar un avioso por pantalla
            } else {
                await updateUser(modifiedPassword)
            }

        } else {
            console.log("El formulario NO es válido")
        }

    }

    const getRoles = async() => {
        try {
            const response = await fetch ('/get_roles', {
                method:'POST',
                headers: { 'Content-Type': 'application/json', }
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setCurrentRoles(data.roles);
                    (language === 'textEs') ? console.log(data.mensaje) : console.log(data.message)
                } else {
                    (language === 'textEs') ? console.log(data.mensaje) : console.log(data.message)
                }
            } else {
                console.log("Response is not ok!")
            }
        } catch (error) {
            console.log("Hubo un problema al conectar con la API")
        }
    }

    const getUserData = () => {
        setUserId(user.id ?? '')
        setName(user.name ?? '')
        setEmail(user.email ?? '')
        const roleMatch = currentRoles.find(r => r.name === user.role);
        const roleId = roleMatch ? roleMatch.id : null;
        setRoles(roleId ?? '')
    }

    useEffect(() => { 
        setNameError('') 
        setIsValidForm(true)
    },[name])
    useEffect(() => { 
        setEmailError('') 
        setIsValidForm(true)
    },[email])
    useEffect(() => { 
        setPassError('') 
        setIsValidForm(true)
    },[password])
    useEffect(() => {
        const normalizedNewRole = newRole.trim().toUpperCase();

        const alreadyExists = currentRoles.some(role => {
            const roleNameWithoutPrefix = role.name.replace(/^ROLE_/, '').toUpperCase();
            return roleNameWithoutPrefix === normalizedNewRole;
        });

        if (alreadyExists) {
            setIsValidForm(false)
            setRolesError("Ese role ya existe.");
        } else {
            setIsValidForm(true)
            setRolesError('');
        }
    }, [newRole, currentRoles]);

    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        if (currentRoles.length > 0) {
            getUserData();
        }
    }, [currentRoles]);

    const updateUser = async (modifiedPassword) => {
        console.log("Modificando usuario...")
        var updatedUser = {}
        if (modifiedPassword) {
            updatedUser = {
                id: user.id,
                name: name !== user.name ? name : null,
                email: email !== user.email ? email : null,
                password: password,
                role: roles !== user.role ? roles : 0
            }
        } else {
            updatedUser = {
                id: user.id,
                name: name !== user.name ? name : null,
                email: email !== user.email ? email : null,
                password: null,
                role: roles !== user.role ? roles : 0
            }
        }

        try {
            const response = await fetch('/update_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser)
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    // Se podría mandar un aviso de confirmación por pantalla
                    window.location.reload()
                } else {
                    (language==='textEs') ? console.log(data.mensaje) : console.log(data.message)
                }
            } else {
                console.log("Response is not Ok!")
            }
        } catch (error) {
            
            console.log("Hubo un error al conectar con la API")
        }
    }

    const createRole = async(fullRole) => {
        try{
            const response = await fetch('/post_new_role', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fullRole
                })
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setRoles(data.id)
                    return true;
                } else {
                    (language === 'textEs') ? console.log(data.mensaje) : console.log(data.message)
                    return false;
                }
            } else {
                console.log("Response is not Ok!")
                return false;
            }

        } catch (error) {
            console.log("Hubo un error al conectar con la API")
            return false;
        }
    }
    
    if (!show) return null;

    return (
        <div id='AppEditUserFormComponent_overlay'>
            <div id='AppEditUserFormComponent_container'>
                <h2 id='AppEditUserFormComponent_title'>Datos del Usuario</h2>
                <form id='AppEditUserFormComponent_formContainer' onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
                    
                    <label className='AppEditUserFormComponent_formLabel'>Id del usuario: </label>
                    <input className='AppEditUserFormComponent_formInput' type="text" readOnly placeholder='Introduce un Id' value={userId}/>
                    <p className='AppEditUserFormComponent_formErrorMessage'>{idError}</p>

                    <label className='AppEditUserFormComponent_formLabel'>Nombre de usuario: </label>
                    <input className='AppEditUserFormComponent_formInput' type="text" required placeholder='Introduce un nombre de usuario' value={name} onChange={(event) => setName(event.target.value)}/>
                    <p className='AppEditUserFormComponent_formErrorMessage'>{nameError}</p>

                    <label className='AppEditUserFormComponent_formLabel'>Correo electrónico: </label>
                    <input className='AppEditUserFormComponent_formInput' type="text" required placeholder='Introduce un correo electrónico' value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <p className='AppEditUserFormComponent_formErrorMessage'>{emailError}</p>
                    
                    <label className='AppEditUserFormComponent_formLabel'>Contraseña: </label>
                    <input className='AppEditUserFormComponent_formInput' type="text" placeholder='Introduce una nueva contraseña' onChange={(event) => setPassword(event.target.value)}/>
                    <p className='AppEditUserFormComponent_formErrorMessage'>{passError}</p>

                    <label className='AppEditUserFormComponent_formLabel'>Selecciona un Role: </label>
                    <select className='AppEditUserFormComponent_formSelect' value={roles} onChange={(event)=>setRoles(event.target.value)}>
                        <option className='AppEditUserFormComponent_formOption' value='' default hidden>{currentTexts.appBillForm.optionDefault}</option>
                        {currentRoles.length > 0 && currentRoles.map(role => {
                            const rawName = role.name.replace(/^ROLE_/, ''); // Elimina el prefijo si existe
                            const filteredName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
                            return (
                                <option className='AppEditUserFormComponent_formOption' key={role.id} value={role.id}>
                                    {filteredName}
                                </option>
                            )
                        })}
                        <option className='AppEditUserFormComponent_formOption' value='0'>Nuevo Role</option>
                    </select>
                    
                    {(roles==='0') ? <input className='AppEditUserFormComponent_formInput' type='text' required placeholder='Introduce el nombre del nuevo Role' onChange={(event) => setNewRole(event.target.value)}/> : ''}
                    <p className='AppEditUserFormComponent_formErrorMessage'>{rolesError}</p>

                    

                    <div id='AppEditUserFormComponent_buttonContainer'>
                        <div id='AppEditUserFormComponent_cancelButtonContainer' onClick={handleClose}>
                            <div></div>
                            <button id='AppEditUserFormComponent_cancelButton' type="button">{currentTexts.appBillForm.cancelButton}</button>
                            <div></div>
                        </div>
                        <div id='AppEditUserFormComponent_submitButtonContainer' onClick={()=>checkData()}>
                            <div></div>
                            <button id='AppEditUserFormComponent_submitButton' type="button" >{currentTexts.appBillForm.saveButton}</button>
                            <div></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AppEditUserFormComponent