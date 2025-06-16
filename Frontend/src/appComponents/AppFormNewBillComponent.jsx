import { useEffect, useState } from 'react';
import '../appStyles/AppFormNewBillComponent.css'

function AppFormNewBillComponent({ show, handleClose, setAddedBills }) {
    
    const [title, setTitle] = useState('')
    const [currentTypes, setCurrentTypes] = useState([])
    const [type, setType] = useState('')
    const [newType, setNewType] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split("T")[0])
    const [file, setFile] = useState()

    const getTipos= async() => {
        //Recoger tipos de la base de datos e insertarlos en currentTypes
        setCurrentTypes(['Cliente','Proveedor','Gasto'])
    }


        
const confirmar = () => {
    const nuevaFactura = {
        title,
        type: type === "4" ? newType : type, // Usa `newType` si es "Otro"
        date,
        file
    };

    // Agregar la nueva factura al array existente de `savedBills`
    setAddedBills(prevBills => [...prevBills, nuevaFactura]);

    handleClose(); // Cierra el formulario después de guardar
}
    
    useEffect(()=>{
        getTipos()
    },[])
    if (!show) return null;

    return (
        <div id='AppFormBillComponent_overlay'>
            <div id='AppFormBillComponent_container'>
                <h2 id='AppFormBillComponent_title'>Nuevo Registro de Factura</h2>
                <form id='AppFormBillComponent_formContainer' onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
                    <label className='AppFormBillComponent_formLabel'>Nombre</label>
                    <input className='AppFormBillComponent_formInput' type="text" required placeholder='Introduce un título para la factura' onChange={(event) => setTitle(event.target.value)}/>

                    <label className='AppFormBillComponent_formLabel'>Tipo de Factura</label>
                    <select className='AppFormBillComponent_formSelect' onChange={(event)=>setType(event.target.value)}>
                        <option className='AppFormBillComponent_formOption' value='' default hidden>Selecciona un tipo</option>
                        <option className='AppFormBillComponent_formOption' value={currentTypes[0]}>{currentTypes[0]}</option>
                        <option className='AppFormBillComponent_formOption' value={currentTypes[1]}>{currentTypes[1]}</option>
                        <option className='AppFormBillComponent_formOption' value={currentTypes[2]}>{currentTypes[2]}</option>
                        <option className='AppFormBillComponent_formOption' value='Otro'>Otro</option>
                    </select>
                    {(type==='Otro') ? <input className='AppFormBillComponent_formInput' type='text' required placeholder='Introduce el nuevo tipo' onChange={(event) => setNewType(event.target.value)}/> : ''}

                    <label className='AppFormBillComponent_formLabel'>Fecha de Emisión:</label>
                    <input className='AppFormBillComponent_formInput' 
                        type="date" 
                        value={date} 
                        required 
                        onChange={(event)=>setDate(event.target.value)}/>

                    <label className='AppFormBillComponent_formLabel'>Archivo: </label>
                    <input className='AppFormBillComponent_formFileInput' 
                        type="file" 
                        accept=".pdf, .xml, .xsig, .facturae, .ubl, .edifact" // tipos de archivo que acepta
                        required 
                        onChange={(event)=>setFile(event.target.files[0])}
                    
                    />

                    <div id='AppFormBillComponent_buttonContainer'>
                        <div id='AppFormBillComponent_cancelButtonContainer' onClick={handleClose}>
                            <div></div>
                            <button id='AppFormBillComponent_cancelButton' type="button">Cancelar</button>
                            <div></div>
                        </div>
                        <div id='AppFormBillComponent_submitButtonContainer' onClick={()=>confirmar()}>
                            <div></div>
                            <button id='AppFormBillComponent_submitButton' type="submit" >Guardar</button>
                            <div></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AppFormNewBillComponent