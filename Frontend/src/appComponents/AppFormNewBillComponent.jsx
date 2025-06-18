import { useEffect, useState } from 'react';
import '../appStyles/AppFormNewBillComponent.css'
import { useLanguage } from '../context/LanguageContext';

function AppFormNewBillComponent({ show, handleClose, setAddedBills }) {
    
    const { language, currentTexts } = useLanguage()
    const [title, setTitle] = useState('')
    const [currentTypes, setCurrentTypes] = useState([])
    const [type, setType] = useState('')
    const [newType, setNewType] = useState('')
    const [date, setDate] = useState(new Date())
    const [file, setFile] = useState()

    const getTipos= async() => {
        //Recoger tipos de la base de datos e insertarlos en currentTypes
        try{
            const response = await fetch('/get_types', {
                method: 'POST',
                headers: { 'ContentType': 'application/json' }
            }) 
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setCurrentTypes(data.types)
                } else {
                    (language === 'textEs') ? console.log(data.mensaje) : console.log(data.message)
                }
            } else {
                console.log("Response is not Ok!")
            }
        } catch (error) {
            console.log("Hubo un error al conectar con la API")
        }
    }

    const confirmar = () => {
        const nuevaFactura = {
            title: title,
            type: type === "4" ? newType : type, // Usa `newType` si es "Otro"
            date: date,
            file: file
        };

        // Agregar la nueva factura al array existente de `savedBills`
        setAddedBills(prevBills => [...prevBills, nuevaFactura]);

        handleClose(); // Cierra el formulario después de guardar
    }

    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value); // Convertir la fecha a objeto Date
        if (!isNaN(selectedDate.getTime())) { // Verificar que sea válida
            setDate(selectedDate);
        }
    };
    
    useEffect(()=>{
        getTipos()
    },[])
    
    if (!show) return null;

    return (
        <div id='AppFormBillComponent_overlay'>
            <div id='AppFormBillComponent_container'>
                <h2 id='AppFormBillComponent_title'>{currentTexts.appBillForm.title}</h2>
                <form id='AppFormBillComponent_formContainer' onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
                    <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label1}</label>
                    <input className='AppFormBillComponent_formInput' type="text" required placeholder={currentTexts.appBillForm.placeholder1} onChange={(event) => setTitle(event.target.value)}/>

                    <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label2}</label>
                    <select className='AppFormBillComponent_formSelect' onChange={(event)=>setType(event.target.value)}>
                        <option className='AppFormBillComponent_formOption' value='' default hidden>{currentTexts.appBillForm.optionDefault}</option>
                        {currentTypes.length > 0 && currentTypes.map(type => {
                            const filteredName = type.name.charAt(0).toUpperCase() + type.name.slice(1).toLowerCase()
                            return (
                                <option className='AppFormBillComponent_formOption' key={type.id} value={type.id}>
                                    {filteredName}
                                </option>
                            )
                        })}
                        <option className='AppFormBillComponent_formOption' value='0'>{currentTexts.appBillForm.optionAnother}</option>
                    </select>
                    
                    {(type==='0') ? <input className='AppFormBillComponent_formInput' type='text' required placeholder={currentTexts.appBillForm.placeholder2} onChange={(event) => setNewType(event.target.value)}/> : ''}

                    <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label3}</label>
                    <input className='AppFormBillComponent_formInput' 
                        type="date" 
                        value={date.toISOString().split("T")[0]} 
                        required 
                        onChange={handleDateChange}/>

                    <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label4}</label>
                    <input className='AppFormBillComponent_formFileInput' 
                        type="file" 
                        accept=".pdf, .xml, .xsig, .facturae, .ubl, .edifact" // tipos de archivo que acepta
                        required 
                        onChange={(event)=>setFile(event.target.files[0])}
                    
                    />

                    <div id='AppFormBillComponent_buttonContainer'>
                        <div id='AppFormBillComponent_cancelButtonContainer' onClick={handleClose}>
                            <div></div>
                            <button id='AppFormBillComponent_cancelButton' type="button">{currentTexts.appBillForm.cancelButton}</button>
                            <div></div>
                        </div>
                        <div id='AppFormBillComponent_submitButtonContainer' onClick={()=>confirmar()}>
                            <div></div>
                            <button id='AppFormBillComponent_submitButton' type="submit" >{currentTexts.appBillForm.saveButton}</button>
                            <div></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AppFormNewBillComponent