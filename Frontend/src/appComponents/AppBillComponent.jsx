import '../appStyles/AppBillComponent.css'
import { useLanguage } from '../context/LanguageContext'

function AppBillComponent({ id, title, type, autor, uploadDate, file }) {
    
    const { currentTexts } = useLanguage()
    
    return(
       <tr id='BillComponent_container'>
            <td className='BillComponent_billData'>{id}</td>
            <td className='BillComponent_billData'>{title}</td>
            <td className='BillComponent_billData'>{type}</td>
            <td className='BillComponent_billData'>{autor}</td>
            <td className='BillComponent_billData'>{new Date(uploadDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            <td id='BillComponent_actions'>
                <h2 className='BillComponent_action'>Edit</h2>
                <h2 className='BillComponent_action'>Download</h2>
                <h2 className='BillComponent_action'>Delete</h2>
            </td>
        </tr>
    )
}

export default AppBillComponent