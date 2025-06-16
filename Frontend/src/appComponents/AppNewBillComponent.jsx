import '../appStyles/AppNewBillComponent.css'

function AppNewBillComponent({ id, saved, title, date, type, file, setSavedBills, setAddedBills }) {
    
    const saveBill = () => {
        // Hay que subirla a la base de daatos sin modificar validDate
        const bill = { id, title, type, date, file }
        if (window.confirm("¿Estás seguro de que quieres guardar esta factura?")) {
                setAddedBills(prevBills => prevBills.filter((_, i) => i !== id));
                setSavedBills(prevBills => [...prevBills, bill]);
        }
    }

    const deleteBill = () => {
        if(saved===true) {
            if (window.confirm("¿Estás seguro de que quieres borrar esta factura?")) {
                setSavedBills(prevBills => prevBills.filter(bill => bill.id !== id));
            }
        } else {
            setAddedBills(prevBills => prevBills.filter((_, i) => i !== id));
        }
    }

    const uploadBill = () => {
        // Hay que subirla a la base de datos modificando validDate
        if(saved===true) {
            if (window.confirm("¿Estás seguro de que quieres publicar esta factura?")) {
                setSavedBills(prevBills => prevBills.filter(bill => bill.id !== id));
            }
        } else {
            setAddedBills(prevBills => prevBills.filter((_, i) => i !== id));
        }
        console.log("Factura con los datos: ["+title+", "+date+", "+type+", "+file+"] subida a la base de datos") 
    }

    return (
        <div id='AppNewBillComponent_container'>
            <h1 className='AppNewBillComponent_billData'>{title}</h1>
            <h1 className='AppNewBillComponent_billData'>{date}</h1>
            {saved===false ? 
                <p className='AppNewBillComponent_billData' onClick={()=>saveBill()}>Guardar</p> 
            : ''}
            <p className='AppNewBillComponent_billData'onClick={()=>uploadBill()}>Subir</p>
            <p className='AppNewBillComponent_billData' onClick={()=>deleteBill()}>Eliminar</p>
        </div>
    )
}

export default AppNewBillComponent