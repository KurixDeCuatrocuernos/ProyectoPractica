import '../appStyles/AppNewBillComponent.css'

function AppNewBillComponent({ id, saved, title, date, type, file, setSavedBills, setAddedBills }) {
    
    const formatDate = (fecha) => {
        if (!(fecha instanceof Date)) {
            fecha = new Date(fecha);
        }
        return fecha.toLocaleDateString("es-ES", { year: "numeric", month: "numeric", day: "numeric" });
    }

    const saveBill = async() => {
        
        const bill = { id, title, type, uploadDate: date, file }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("type", parseInt(type));
        formData.append("uploadDate", new Date(date).getTime());
        formData.append("pdf", file)
        if (window.confirm("¿Estás seguro de que quieres guardar esta factura?")) {
            try {
                const response = await fetch('/post_new_bill', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    window.location.href;
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
            <h1 className='AppNewBillComponent_billData'>{formatDate(date)}</h1>
            {saved===false ? 
                <p className='AppNewBillComponent_billData' onClick={()=>saveBill()}>Guardar</p> 
            : ''}
            <p className='AppNewBillComponent_billData'onClick={()=>uploadBill()}>Subir</p>
            <p className='AppNewBillComponent_billData' onClick={()=>deleteBill()}>Eliminar</p>
        </div>
    )
}

export default AppNewBillComponent