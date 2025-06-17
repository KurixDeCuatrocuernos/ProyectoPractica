import '../appStyles/AppBillsListComponent.css'
import Bill from './AppBillComponent.jsx'
import SearchBar from './SearchBar.jsx'
import DateFilter from './AppFilterDateComponent.jsx'
import TypeFilter from './AppFilterTypeComponent.jsx'
import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'


function AppBillsListComponent() {

    /* Aquí sólo deben recogerse las facturas del usuario loggeado y pasar los datos a Bill (que debe recogerlos y mostrarlos) */
    /* Sería preciso ver cómo el filtro puede limitar cuáles se muestran de esos que se han recogido */
    /* Por ejemplo, mediante un if en el .map() */
    
    const {currentTexts} = useLanguage()
    const currentYear = new Date().getFullYear();
    const [bills, setBills] = useState([])
    
    const [search, setSearch] = useState("");
    const [type, setType] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const getBills = () => {
        //Aquí se deberían recoger las facturas
        const newBills = ([
            { id: 1,  name: "Factura Enero",      type: "Cliente",   autor: "Asesor Prueba", uploadDate: new Date(currentYear, 0, 1).toISOString() },
            { id: 2,  name: "Factura Febrero",    type: "Gasto",     autor: "Asesor Prueba", uploadDate: new Date(currentYear, 1, 1).toISOString() },
            { id: 3,  name: "Factura Marzo",      type: "Proveedor", autor: "Asesor Prueba", uploadDate: new Date(currentYear, 2, 1).toISOString() },
            { id: 4,  name: "Factura Abril",      type: "Proveedor", autor: "Asesor Prueba", uploadDate: new Date(currentYear, 3, 1).toISOString() },
            { id: 5,  name: "Factura Mayo",       type: "Gasto",     autor: "Asesor Prueba", uploadDate: new Date(currentYear, 4, 1).toISOString() },
            { id: 6,  name: "Factura Junio",      type: "Gasto",     autor: "Asesor Prueba", uploadDate: new Date(currentYear, 5, 1).toISOString() },
            { id: 7,  name: "Factura Julio",      type: "Cliente",   autor: "Asesor Prueba", uploadDate: new Date(currentYear, 6, 1).toISOString() },
            { id: 8,  name: "Factura Agosto",     type: "Cliente",   autor: "Asesor Prueba", uploadDate: new Date(currentYear, 7, 1).toISOString() },
            { id: 9,  name: "Factura Septiembre", type: "Gasto",     autor: "Asesor Prueba", uploadDate: new Date(currentYear, 8, 1).toISOString() },
            { id: 10, name: "Factura Ocubre",     type: "Proveedor", autor: "Asesor Prueba", uploadDate: new Date(currentYear, 9, 1).toISOString() },
            { id: 11, name: "Factura Noviembre",  type: "Cliente",   autor: "Asesor Prueba", uploadDate: new Date(currentYear, 10, 1).toISOString() },
            { id: 12, name: "Factura Diciembre",  type: "Proveedor", autor: "Asesor Prueba", uploadDate: new Date(currentYear, 11, 1).toISOString() }
        ])
        setBills(newBills)
    }
    
    useEffect(() => {
        getBills()
    }, [])

        useEffect(() => {
        console.log("se ha elegido el valor del tipo: ",type)
    }, [type])

        useEffect(() => {
        console.log("se ha elegido el valor del tipo: ",bills)
    }, [bills])

    return (
        <div id="AppBillsList_container">
            <div id='AppBillsList_filtersContainer'>
                <SearchBar setSearch={setSearch}/>
                <DateFilter startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
                <TypeFilter setType={setType}/>
            </div>
            {/* Esto permite comprobar que funcionan los filtros aquí
            <h1>Se ha buscado: {search}</h1>
            <h1>Se ha elegido el intervalo de tiempo:
                {startDate ? ' '+startDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }) : ''}
                {endDate ? ' hasta: '+endDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }) : ''}
            </h1>
            <h1>Se ha elegido el tipo: {type}</h1>
             */}
            <div id='AppBillsList_billsContainer'>
                <table id='AppBillsList_table'>
                    <thead>
                        <tr className='AppBillsList_tableRow'>
                            <th className="AppBillsList_title">{currentTexts.appBills.title1}</th>
                            <th className="AppBillsList_title">{currentTexts.appBills.title2}</th>
                            <th className="AppBillsList_title">{currentTexts.appBills.title3}</th>
                            <th className="AppBillsList_title">{currentTexts.appBills.title4}</th>
                            <th className="AppBillsList_title">{currentTexts.appBills.title5}</th>
                            <th className="AppBillsList_title">{currentTexts.appBills.title6}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        bills
                            .filter(bill =>
                                search === "" || 
                                bill.name.toLowerCase().includes(search.toLowerCase()) || 
                                bill.type.toLowerCase().includes(search.toLowerCase()) || 
                                bill.autor.toLowerCase().includes(search.toLowerCase()) ||
                                bill.id.toString().toLowerCase().includes(search.toLowerCase())
                            ) // Primero filtramos por búsqueda
                            .filter(bill => type === "" || bill.type.toLowerCase() === type.toLowerCase()) // Luego filtramos por tipo solo en los resultados de arriba
                            .filter(bill => {
                                if (!startDate || !endDate) return true; // Si alguna fecha es "" o null, no filtrar
                                const billDate = new Date(bill.uploadDate); // Convertir `uploadDate` a objeto Date
                                return billDate >= new Date(startDate) && billDate <= new Date(endDate);
                            })
                            .map(bill => (
                                <Bill key={bill.id} id={bill.id} title={bill.name} type={bill.type} autor={bill.autor} uploadDate={bill.uploadDate} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppBillsListComponent