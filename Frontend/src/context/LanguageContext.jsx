import { createContext, useState, useContext } from 'react';
import textEs from '../assets/es.json';
import textEn from '../assets/en.json';
/** Este contexto permite cambiar entre idiomas en la Web*/
const LanguageContext = createContext();

const texts = {
  textEs,
  textEn
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('textEs');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'textEs' ? 'textEn' : 'textEs'));
  };

  const currentTexts = texts[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, currentTexts }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);