import { useState } from 'react';
import '../appStyles/AppNewBillComponent.css'
import BillForm from './AppFormNewBillComponent'

function AppNewBillComponent({ id, saved, title, date, type, file, setSavedBills, setAddedBills }) {
    
    const [showForm, setShowForm] = useState(false);
    const bill = { id, title, type, uploadDate: date, file };

    const formatDate = (fecha) => {
        if (!(fecha instanceof Date)) {
            fecha = new Date(fecha);
        }
        return fecha.toLocaleDateString("es-ES", { year: "numeric", month: "numeric", day: "numeric" });
    }

    const saveAndUploadBill = async() => {
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("type", parseInt(type));
        formData.append("uploadDate", new Date(date).getTime());

        console.log("al subir la factura se envía el archivo: "+file)

        formData.append("pdf", file)
        if (window.confirm("¿Estás seguro de que quieres publicar esta factura?")) {
            try {
                const response = await fetch('/post_upload_new_bill', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    const data = await response.json()
                    if (data.status===200) {
                        window.location.reload();
                        setAddedBills(prevBills => prevBills.filter((_, i) => i !== id));
                        setSavedBills(prevBills => [...prevBills, bill]);
                    } else {
                        console.log("Error al publicar la factura")
                    }
                   
                } else {
                    console.log("Response is not Ok!")
                }
            } catch (error) {
                console.log("Hubo un problema al conectar con la API")
            }
        }
    }

    const saveBill = async() => {
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("type", parseInt(type));
        formData.append("uploadDate", new Date(date).getTime());

        console.log("al subir la factura se envía el archivo: "+file)

        formData.append("pdf", file)
        if (window.confirm("¿Estás seguro de que quieres guardar esta factura?")) {
            try {
                const response = await fetch('/post_new_bill', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    window.location.reload();
                    setAddedBills(prevBills => prevBills.filter((_, i) => i !== id));
                    setSavedBills(prevBills => [...prevBills, bill]);
                } else {
                    console.log("Response is not Ok!")
                }
            } catch (error) {
                console.log("Hubo un problema al conectar con la API")
            }
        }
    }

    const deleteBill = async() => {
        if(saved===true) {
            if (window.confirm("¿Estás seguro de que quieres borrar esta factura?")) {
                try {
                    const response = await fetch('/post_delete_bill', {
                        method: 'POST',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify(id)
                    })
                    if (response.ok) {
                        const data = await response.json()
                        if (data.status === 200) {
                            window.location.reload()
                        } else {
                            (language==='textEs') ? console.log(data.mensaje) : console.log(data.message)
                        }
                    } else {
                        console.log("Response is not Ok!")
                    }
                } catch (error) {
                    console.log("Hubo un error al conectaar con la API")
                }
                setSavedBills(prevBills => prevBills.filter(bill => bill.id !== id));
            }
        } else {
            setAddedBills(prevBills => prevBills.filter((_, i) => i !== id));
        }
    }

    const uploadBill = async() => {
        // Hay que subirla a la base de datos modificando validDate
        if(saved===true) {
            if (window.confirm("¿Estás seguro de que quieres publicar esta factura?")) {
                try {
                    const response = await fetch('/post_upload_bill', {
                        method: 'PUT',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify(id)
                    })
                    if (response.ok) {
                        const data = await response.json()
                        if (data.status === 200) {
                            setSavedBills(prevBills => prevBills.filter(bill => bill.id !== id));
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
        } else {
            setAddedBills(prevBills => prevBills.filter((_, i) => i !== id));
        }
        console.log("Factura con los datos: ["+title+", "+date+", "+type+", "+file+"] subida a la base de datos") 
    }

    return (
        <div id='AppNewBillComponent_container'>
            <h1 className='AppNewBillComponent_billData'>{title}</h1>
            <h1 className='AppNewBillComponent_billData'>{formatDate(date)}</h1>
            {saved===false ? 
                <p className='AppNewBillComponent_billData' onClick={()=>saveBill()}>Guardar</p> 
            : ''}
            <p className='AppNewBillComponent_billData'onClick={()=>{
                if (saved === false) {
                    saveAndUploadBill()
                } else {
                    uploadBill()
                }

            }}>Subir</p>
            {saved===true ? 
                <p className='AppNewBillComponent_billData' onClick={() => setShowForm(true)}>Editar</p> 
            : ''}
            <p className='AppNewBillComponent_billData' onClick={()=>deleteBill()}>Eliminar</p>
            {showForm && <BillForm show={showForm} setAddedBills={setAddedBills} handleClose={() => setShowForm(false)} onEdit={true} bill={bill}/>}
        </div>
    )
}

export default AppNewBillComponent