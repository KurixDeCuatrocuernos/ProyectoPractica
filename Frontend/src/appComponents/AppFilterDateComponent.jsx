import '../appStyles/AppFilterDateComponent.css'
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLanguage } from '../context/LanguageContext';

function AppFilterDateComponent({ startDate, endDate, setStartDate, setEndDate }) {

    const {currentTexts} = useLanguage();

    const resetDates = () => {
        setStartDate('')
        setEndDate('')
    }
    
    return(
        <div id='FilterDate_container'>
            <div id='FilterDate_inputContainer'>
                <h2 id="FilterDate_title">{currentTexts.dateFilter.title}</h2>
                <DatePicker
                    className="FilterDate_DatePicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MM/yyyy" // Formato de mes/año
                    showMonthYearPicker // Muestra solo mes y año
                    placeholderText={currentTexts.dateFilter.startDate}
                />
                <DatePicker
                    className="FilterDate_DatePicker"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="MM/yyyy" // Formato de mes/año
                    showMonthYearPicker // Muestra solo mes y año
                    placeholderText={currentTexts.dateFilter.endDate}
                />
            </div>
            <div id='filterDate_buttonContainer'>
                {
                    startDate !== '' && endDate !== '' ? 
                    <button id='FilterDate_resetButton' onClick={() => resetDates()}>{currentTexts.dateFilter.resetButton}</button>
                    : <div/>
                }
            </div>
        </div>
    )
}
export default AppFilterDateComponent