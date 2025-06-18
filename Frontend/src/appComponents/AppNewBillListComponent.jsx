import { useEffect, useState } from 'react'
import '../appStyles/AppNewBillListComponent.css'
import Bill from '../appComponents/AppNewBillComponent.jsx'
import BillForm from './AppFormNewBillComponent.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

function AppNewBillListComponent() {
    
    const { language, currentTexts } = useLanguage()
    const [savedBills, setSavedBills] = useState([])
    const [addedBills, setAddedBills] = useState([])
    const [newBill, setNewBill] = useState() // Por ahora no se usa
    const [showForm, setShowForm] = useState(false);

    const getBills = async() => {
        try {
            const response = await fetch('/get_saved_bills', {method: 'GET'})
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    const projections = data.facturas.map(fw => fw.value);
                    setSavedBills(projections)
                    console.log("Se han recogido las facturas: "+data.facturas)
                } else {
                    (language === 'textEs') ? console.log(data.mensaje) : console.log(data.message)
                }
            } else {
                console.log("Response is not OK!")
            }
        } catch (error) {
            console.log("Hubo un error al conectar con la API")
        }
    }

    useEffect(() => {
        getBills()
    }, [])

    return (
        <div id='AppNewBillListComponent_container'>
            <div id='AppNewBillListComponent_savedBillsContainer'>
                <h1 id='AppNewBillListComponent_title'>{currentTexts.appNewBillComponent.title}</h1>
                <div id='AppNewBillListComponent_billsContainer'>
                    { 
                        savedBills.length > 0 
                            ? savedBills
                            .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
                            .map((bill, index) => (
                                <Bill key={index} id={bill.id} saved={true} title={bill.title} date={bill.uploadDate} type={bill.type} file={bill.file} setSavedBills={setSavedBills} setAddedBills={setAddedBills}/>
                            ))
                            : <h1 className="AppNewBillListComponent_emptyMessage">{currentTexts.appNewBillComponent.emptyMessage}</h1>
                    }
                </div>
            </div>
            <div id='AppNewBillListComponent_addingBillsContainer'>
                <button id='AppNewBillListComponent_addBillButton' onClick={() => setShowForm(true)}>{currentTexts.appNewBillComponent.addBill}</button>
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