import '../appStyles/AppBillsListComponent.css'
import Bill from './AppBillComponent.jsx'
import SearchBar from './SearchBar.jsx'
import DateFilter from './AppFilterDateComponent.jsx'
import TypeFilter from './AppFilterTypeComponent.jsx'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'


function AppBillsListComponent() {

    /* Aquí sólo deben recogerse las facturas del usuario loggeado y pasar los datos a Bill (que debe recogerlos y mostrarlos) */
    /* Sería preciso ver cómo el filtro puede limitar cuáles se muestran de esos que se han recogido */
    /* Por ejemplo, mediante un if en el .map() */
    
    const {currentTexts} = useLanguage()
    const [bills, setBills] = useState([1])
    
    const [search, setSearch] = useState();
    const [type, setType] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

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
                        {/* Falta el filtrado (para ello es preciso recoger las facturas de la base de datos) */}
                        
                        {bills.map((bill, index) => (
                            <Bill key={index}/>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppBillsListComponent