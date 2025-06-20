import { useState } from 'react'
import '../appStyles/AppBillComponent.css'
import { useLanguage } from '../context/LanguageContext'
import BillForm from './AppFormNewBillComponent'

function AppBillComponent({ id, title, type, autor, uploadDate, file }) {
    
    const { language, currentTexts } = useLanguage()
    const [showForm, setShowForm] = useState(false)
    const [addedBills, setAddedBills] = useState([])
    const bill = { id, title, type, autor, uploadDate, file }

    const deleteBill = async() => {
        if (id != null) {
            if (window.confirm("¿Estás seguro de que quieres borrar esta factura?")){
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
            }
        } else {
            console.error("No se puede borrar esa factura porque su id es Nulo")
        }
    }

    return(
       <tr id='BillComponent_container'>
            <td className='BillComponent_billData'>{id}</td>
            <td className='BillComponent_billData'>{title}</td>
            <td className='BillComponent_billData'>{type}</td>
            <td className='BillComponent_billData'>{autor}</td>
            <td className='BillComponent_billData'>{new Date(uploadDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            <td id='BillComponent_actions'>
                <h2 className='BillComponent_action' onClick={() => setShowForm(true)}>Edit</h2>
                <h2 className='BillComponent_action'>Download</h2>
                <h2 className='BillComponent_action' onClick={() => deleteBill()}>Delete</h2>
            </td>
            <td>
                {showForm && <BillForm show={showForm} setAddedBills={setAddedBills} handleClose={() => setShowForm(false)} onEdit={true} bill={bill}/>}
            </td>
        </tr>
        
    )
}

export default AppBillComponent