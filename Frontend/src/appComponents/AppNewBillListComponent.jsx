import { useState } from 'react'
import '../appStyles/AppNewBillListComponent.css'
import Bill from '../appComponents/AppNewBillComponent.jsx'
import BillForm from './AppFormNewBillComponent.jsx'

function AppNewBillListComponent() {
    
    const [savedBills, setSavedBills] = useState([])
    const [addedBills, setAddedBills] = useState([])
    const [newBill, setNewBill] = useState()
    const [showForm, setShowForm] = useState(false);

    return (
        <div id='AppNewBillListComponent_container'>
            <div id='AppNewBillListComponent_savedBillsContainer'>
                <h1 id='AppNewBillListComponent_title'>Facturas Guardadas: </h1>
                <div id='AppNewBillListComponent_billsContainer'>
                    { savedBills.length > 0 ?
                    savedBills.map((bill, index) => (
                        <Bill key={index} id={index} saved={true} title={bill.title} date={bill.date} type={bill.type} file={bill.file} setSavedBills={setSavedBills} setAddedBills={setAddedBills}/>
                    ))
                    : <h1 className="AppNewBillListComponent_emptyMessage">No Hay Facturas pendientes que subir</h1>
                    }
                </div>
            </div>
            <div id='AppNewBillListComponent_addingBillsContainer'>
                <button id='AppNewBillListComponent_addBillButton' onClick={() => setShowForm(true)}>Añadir Factura</button>
                {
                addedBills.length > 0 && 
                    addedBills.map((bill, index) => (
                        <Bill key={index} id={index} saved={false} title={bill.title} date={bill.date} type={bill.type} file={bill.file} setSavedBills={setSavedBills} setAddedBills={setAddedBills}/>
                    ))
                }
                {showForm && <BillForm show={showForm} setAddedBills={setAddedBills} handleClose={() => setShowForm(false)}/>}
            </div>
        </div>
    )
}

export default AppNewBillListComponent