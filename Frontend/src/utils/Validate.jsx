import { useLanguage } from '../context/LanguageContext';

const Validate = () => {
    const { language } = useLanguage();

    const messages = {
        textEs: {
            emailShort: "Este email es demasiado corto",
            emailNotText: "Esto no es un texto",
            emailLong: "Este email es demasiado largo",
            emailInvalid: "Este email no termina en: ...@escudero.juridico.es",
            passShort: "Esta contraseña es demasiado corta",
            passNotText: "Esto no es un texto",
            passLong: "Esta contraseña es demasiado larga"
        },
        textEn: {
            emailShort: "This email is too short",
            emailNotText: "This is not a text",
            emailLong: "This email is too long",
            emailInvalid: "This email does not end with: ...@escudero.juridico.es",
            passShort: "This password is too short",
            passNotText: "This is not a text",
            passLong: "This password is too long"
        }
    };

    const isText = (text) => typeof text === 'string' || text === '';

    const isValidEmail = (email) => {
        if (email === null || email.length < 22) return messages[language].emailShort;
        else if (!isText(email)) return messages[language].emailNotText;
        else if (email.length > 255) return messages[language].emailLong;
        else if (!email.endsWith('@escudero.juridico.es')) return messages[language].emailInvalid;
        else return null;
    };

    const isValidPassword = (pass) => {
        if (pass === null || pass.length < 6) return messages[language].passShort;
        else if (!isText(pass)) return messages[language].passNotText;
        else if (pass.length > 255) return messages[language].passLong;
        else return null;
    };

    return { isValidEmail, isValidPassword };
};

export default Validate;