import { useRef } from 'react';
import '../appStyles/SearchBar.css'
import find from '../assets/busqueda.png'
import { useLanguage } from '../context/LanguageContext';

function SearchBar({ setSearch }) {

    const {currentTexts} = useLanguage()
    const inputRef = useRef(null); // Referencia al input

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus(); // Enfoca el input cuando se hace clic en los elementos hermanos
        }
    };

    return(
        <div id='SearchBar_container'>
            <div id="SearchBar_leftBar" onClick={focusInput}></div>
            <div id='SearchBar_searchBarContainer'>
                <input id='SearchBar_input' type="text" placeholder={currentTexts.searchBar.placeholder} onChange={(event) => setSearch(event.target.value)} ref={inputRef}/>
            </div>
            <div id='SearchBar_rightBar' onClick={focusInput}>
                <img id='SearchBar_searchImage' src={find} alt="Dearch Icon from FlatIcon" />
            </div>
            {/* Uicons de <a href="https://www.flaticon.com/uicons">Flaticon</a> */}
        </div>
    )
}

export default SearchBar;