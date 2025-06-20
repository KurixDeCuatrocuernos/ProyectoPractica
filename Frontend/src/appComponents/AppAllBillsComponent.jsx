import { useEffect, useState } from 'react'
import '../appStyles/AppAllBillsComponent.css'
import { useLanguage } from '../context/LanguageContext'
import SearchBar from './SearchBar.jsx'
import DateFilter from './AppFilterDateComponent.jsx'
import TypeFilter from './AppFilterTypeComponent.jsx'
import Bill from './AppBillComponent.jsx'

function AppAllBillsComponent() {
        
    /* Aquí deben recogerse todas las facturas y pasar los datos a Bill (que debe recogerlos y mostrarlos) */
    /* Sería preciso ver cómo el filtro puede limitar cuáles se muestran de esos que se han recogido */
    /* Por ejemplo, mediante un if en el .map() */

    const {language, currentTexts} = useLanguage()
    const currentYear = new Date().getFullYear()
    const [hasMounted, setHasMounted] = useState(false)
    const [bills, setBills] = useState([])

    const [search, setSearch] = useState("");
    const [type, setType] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const getBills = async() => {
        //Aquí se deberían recoger las facturas
        try {
            const response = await fetch('/get_all_bills', {method:'GET'})
            if (response.ok) {
                const data = await response.json()
                if (data.status === 200) {
                    setBills(data.facturas)
                } else {
                    (language === 'textEs') 
                        ? console.log(data.mensaje) 
                        : console.log(data.message)
                }
            } else {
                console.log('Response is not Ok!')
            }
        } catch (error) {
            console.log("Hubo un error al conectar con la API")
        }
    }

    useEffect(() => {
        getBills()
        setHasMounted(true)
    }, [])

    useEffect(() => {
        if (hasMounted) console.log("se ha elegido el valor del tipo:", type) 
    }, [type])

    useEffect(() => {
        if (hasMounted) console.log("Bills ha adquirido los valores: ",bills) 
    }, [bills])

    return (
        <div id="AppAllBillsComponent_container">
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
            <div id='AppAllBillsComponent_billsContainer'>
                <table id='AppAllBillsComponent_table'>
                    <thead>
                        <tr className='AppAllBillsComponent_tableRow'>
                            <th className="AppAllBillsComponent_title">{currentTexts.appAllBills.title1}</th>
                            <th className="AppAllBillsComponent_title">{currentTexts.appAllBills.title2}</th>
                            <th className="AppAllBillsComponent_title">{currentTexts.appAllBills.title3}</th>
                            <th className="AppAllBillsComponent_title">{currentTexts.appAllBills.title4}</th>
                            <th className="AppAllBillsComponent_title">{currentTexts.appAllBills.title5}</th>
                            <th className="AppAllBillsComponent_title">{currentTexts.appAllBills.title6}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        bills
                            .sort((a, b) => new Date(b.value.uploadDate) - new Date(a.value.uploadDate))
                            .filter(bill =>
                                search === "" || 
                                bill.value.title.toLowerCase().includes(search.toLowerCase()) || 
                                bill.value.type.toLowerCase().includes(search.toLowerCase()) || 
                                bill.value.user.toLowerCase().includes(search.toLowerCase()) ||
                                bill.value.id.toString().toLowerCase().includes(search.toLowerCase())
                            ) // Primero filtramos por búsqueda
                            .filter(bill => type === "" || bill.value.type.toLowerCase() === type.toLowerCase()) // Luego filtramos por tipo solo en los resultados de arriba
                            .filter(bill => {
                                if (!startDate || !endDate) return true; // Si alguna fecha es "" o null, no filtrar
                                const billDate = new Date(bill.value.uploadDate); // Convertir `uploadDate` a objeto Date
                                return billDate >= new Date(startDate) && billDate <= new Date(endDate);
                            })
                            .map(billObj => {
                                const bill = billObj.value
                                return (
                                    <Bill key={bill.id} id={bill.id} title={bill.title} type={bill.type} autor={bill.user} uploadDate={bill.uploadDate} file={bill.pdf}/>
                                );
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppAllBillsComponent