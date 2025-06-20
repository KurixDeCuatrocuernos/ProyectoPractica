import { useEffect, useState } from 'react';
import '../appStyles/AppFormNewBillComponent.css'
import { useLanguage } from '../context/LanguageContext';
import Validate from '../utils/Validate';

function AppFormNewBillComponent({ show, handleClose, setAddedBills, onEdit, bill }) {
    
    const { language, currentTexts } = useLanguage()
    const {isValidName} = Validate()
    const [title, setTitle] = useState('')
    const [currentTypes, setCurrentTypes] = useState([])
    const [type, setType] = useState('')
    const [newType, setNewType] = useState('')
    const [date, setDate] = useState(new Date())
    const [file, setFile] = useState()
    
    const [titleError, setTitleError] = useState('')
    const [fileError, setFileError] = useState('')
    const [typeError, setTypeError] = useState('')
    const [newTypeError, setNewTypeError] = useState('')

    const updateBill = async() => {
        try {
            const formData = new FormData();
            formData.append("id", bill.id)
            if (title !== bill.title) formData.append("title", title)
            if (type !== bill.type) formData.append("type", type)
            if (date !== bill.uploadDate) formData.append("uploadDate", date.getTime())
            if (file) {
                formData.append("pdf", file);
            } 
            const response = await fetch('/post_update_bill', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    window.location.reload()
                } else {
                    (language === 'textEs') ? console.log(data.mensaje) : console.log(data.message)
                }
            } else {
                console.log("Response is not Ok!")
            }
        } catch (error) {
            console.log("Hubo un problema al conectar con la API: "+error)
        }
    }

    const getBillData = () => {
    if (onEdit && bill !== null && currentTypes.length > 0) {
        try {
            setTitle(bill.title || '');
            const matchedType = currentTypes.find(t => t.name.toLowerCase() === bill.type.toLowerCase());
            if (matchedType) {
                setType(String(matchedType.id));
            }
            setDate(new Date(bill.uploadDate));
            setFile(bill.file || null);
        } catch (error) {
            console.error("Hubo un error al escribir los datos de la factura:", error);
        }
    }
};

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
        var isValidForm = true
        if(isValidName(title) !== null) {
            console.log("formulario inválido")
            isValidForm = false
            setTitleError(isValidName(title))
        }
        if (!onEdit && !file) {
            console.log("formulario inválido")
            isValidForm = false
            setFileError("Debes insertar un archivo con la factura")
        } 

        if (type === '') {
            isValidForm = false
            setTypeError("La Factura ha de tener un tipo")
        }

        if (String(type) === '0' && isValidName(newType) !== null) {
            isValidForm = false
            setNewTypeError(isValidName(newType))
        }
        
        if (isValidForm && !onEdit) {

            console.log("formulario válido")
            console.log("Se ha completado la nueva factura con el archivo: "+file)
            const nuevaFactura = {
                title: title,
                type: type === "0" ? newType : type,
                date: date,
                file: file
            }

            // Agregar la nueva factura al array existente de `savedBills`
            setAddedBills(prevBills => [...prevBills, nuevaFactura]);

            handleClose(); // Cierra el formulario después de guardar
        } else if (isValidForm && onEdit) {
            updateBill()
        }
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

    useEffect(() => {
        if (onEdit && currentTypes.length > 0) {
            getBillData();
        }
    }, [onEdit, currentTypes]);

    useEffect(() => {
        if (titleError !== '') { setTitleError('') }
    },[title])

    useEffect(() => {
        if (fileError !== '') { setFileError('') }
    },[file])

    useEffect(()=>{
        if (typeError !== '') { setTypeError('') }
    },[type])

    useEffect(() => {
        if (newTypeError !== '') { setNewTypeError('') }
    },[newType, type])
    
    if (!show) return null;

    if (!onEdit) {
        return (
            <div id='AppFormBillComponent_overlay'>
                <div id='AppFormBillComponent_container'>
                    <h2 id='AppFormBillComponent_title'>{currentTexts.appBillForm.title1}</h2>
                    <form id='AppFormBillComponent_formContainer' onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
                        <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label1}</label>
                        <input className='AppFormBillComponent_formInput' value={title} type="text" required placeholder={currentTexts.appBillForm.placeholder1} onChange={(event) => setTitle(event.target.value)}/>
                        <p className='AppFormBillComponent_formErrorMessage'>{titleError}</p>

                        <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label2}</label>
                        <select className='AppFormBillComponent_formSelect' value={type} onChange={(event)=>setType(event.target.value)}>
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
                        <p className='AppFormBillComponent_formErrorMessage'>{typeError}</p>
                        
                        {(type==='0') ? <input className='AppFormBillComponent_formInput' type='text' required placeholder={currentTexts.appBillForm.placeholder2} onChange={(event) => setNewType(event.target.value)}/> : ''}
                        <p className='AppFormBillComponent_formErrorMessage'>{newTypeError}</p>


                        <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label3}</label>
                        <input className='AppFormBillComponent_formInput' 
                            type="date" 
                            value={date.toISOString().split("T")[0]} 
                            required 
                            onChange={handleDateChange}/>

                        <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label4}</label>
                        <div className="AppFormBillComponent_formFileInputContainer">
                            <label htmlFor="fileUpload" className="AppFormBillComponent_formFileLabel">
                                {currentTexts.appBillForm.inputButtonText}
                            </label>
                            <input
                                id="fileUpload"
                                type="file"
                                className="AppFormBillComponent_hiddenFileInput"
                                accept=".pdf, .xml, .xsig, .facturae, .ubl, .edifact"
                                required
                                onChange={(event) => setFile(event.target.files[0])}
                            />
                            <p className="AppFormBillComponent_selectedFileText">
                                {file ? file.name : currentTexts.appBillForm.noneFile}
                            </p>
                        </div>
                        <p className='AppFormBillComponent_formErrorMessage'>{fileError}</p>

                        <div id='AppFormBillComponent_buttonContainer'>
                            <div id='AppFormBillComponent_cancelButtonContainer' onClick={handleClose}>
                                <div></div>
                                <button id='AppFormBillComponent_cancelButton' type="button">{currentTexts.appBillForm.cancelButton}</button>
                                <div></div>
                            </div>
                            <div id='AppFormBillComponent_submitButtonContainer' onClick={() => { confirmar() }}>
                                <div></div>
                                <button id='AppFormBillComponent_submitButton' type="button" >{currentTexts.appBillForm.saveButton}</button>
                                <div></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div id='AppFormBillComponent_overlay'>
                <div id='AppFormBillComponent_container'>
                    <h2 id='AppFormBillComponent_title'>{currentTexts.appBillForm.title2}</h2>
                    <form id='AppFormBillComponent_formContainer' onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
                        <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label1}</label>
                        <input className='AppFormBillComponent_formInput' value={title} type="text" required placeholder={currentTexts.appBillForm.placeholder1} onChange={(event) => setTitle(event.target.value)}/>
                        <p className='AppFormBillComponent_formErrorMessage'>{titleError}</p>

                        <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label2}</label>
                        <select className='AppFormBillComponent_formSelect' value={type} onChange={(event)=>setType(event.target.value)}>
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
                        <p className='AppFormBillComponent_formErrorMessage'>{typeError}</p>
                        
                        {(type==='0') ? <input className='AppFormBillComponent_formInput' type='text' required placeholder={currentTexts.appBillForm.placeholder2} onChange={(event) => setNewType(event.target.value)}/> : ''}
                        <p className='AppFormBillComponent_formErrorMessage'>{newTypeError}</p>


                        <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label3}</label>
                        <input className='AppFormBillComponent_formInput' 
                            type="date" 
                            value={date.toISOString().split("T")[0]} 
                            required 
                            onChange={handleDateChange}/>

                        <label className='AppFormBillComponent_formLabel'>{currentTexts.appBillForm.label5}</label>
                        <div className="AppFormBillComponent_formFileInputContainer">
                            <label htmlFor="fileUpload" className="AppFormBillComponent_formFileLabel">{currentTexts.appBillForm.inputButtonText}</label>
                            <input
                                id="fileUpload"
                                type="file"
                                className="AppFormBillComponent_hiddenFileInput"
                                accept=".pdf, .xml, .xsig, .facturae, .ubl, .edifact"
                                onChange={(event) => setFile(event.target.files[0])}
                            />
                            <p className="AppFormBillComponent_selectedFileText">
                                {file && file.name ? file.name : currentTexts.appBillForm.noneFile}
                            </p>
                        </div>
                        <p className='AppFormBillComponent_formErrorMessage'>{fileError}</p>


                        <div id='AppFormBillComponent_buttonContainer'>
                            <div id='AppFormBillComponent_cancelButtonContainer' onClick={handleClose}>
                                <div></div>
                                <button id='AppFormBillComponent_cancelButton' type="button">{currentTexts.appBillForm.cancelButton}</button>
                                <div></div>
                            </div>
                            <div id='AppFormBillComponent_submitButtonContainer' onClick={() => { confirmar() }}>
                                <div></div>
                                <button id='AppFormBillComponent_submitButton' type="button" >{currentTexts.appBillForm.saveButton}</button>
                                <div></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AppFormNewBillComponent