import { useState } from 'react'
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

    const {currentTexts} = useLanguage()
    const [bills, setBills] = useState([1])

    const [search, setSearch] = useState();
    const [type, setType] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

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
                        
                        {bills.map((bill, index) => (
                            <Bill key={index}/>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppAllBillsComponent