import '../appStyles/AppBillComponent.css'
import { useLanguage } from '../context/LanguageContext'

function AppBillComponent({ id, name, type, usrName, dateSubmit }) {
    
    const { currentTexts } = useLanguage()
    
    return(
       <tr id='BillComponent_container'>
            <td className='BillComponent_billData'>0</td>
            <td className='BillComponent_billData'>Factura Mayo</td>
            <td className='BillComponent_billData'>Gasto</td>
            <td className='BillComponent_billData'>Usuario Prueba</td>
            <td className='BillComponent_billData'> 1/06/2025</td>
            <td id='BillComponent_actions'>
                <h2 className='BillComponent_action'>Edit</h2>
                <h2 className='BillComponent_action'>Download</h2>
                <h2 className='BillComponent_action'>Delete</h2>
            </td>
        </tr>
    )
}

export default AppBillComponent