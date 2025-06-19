import { useLanguage } from '../context/LanguageContext';

const Validate = () => {
    const { language } = useLanguage();

    const messages = {
        textEs: {
            emailShort: "Este email es demasiado corto",
            emailNotText: "Esto no es un texto",
            emailLong: "Este email es demasiado largo",
            emailInvalid: "El email debe terminar con: @escudero.juridico.es",
            emailSQLWords: "Ese email contiene palabras prohibidas",
            passShort: "Esta contraseña es demasiado corta",
            passNotText: "Esto no es un texto",
            passLong: "Esta contraseña es demasiado larga",
            passSQLWords: "Esa contraseña contiene palabras prohibidas",
            nameShort: "Ese Nombre es demasiado corto",
            nameNotText: "Eso no es un texto",
            nameLong: "Ese nombre en demasiado largo",
            nameInvalid: "El nombre sólo puede contener letras",
            nameSQLWords: "Ese nombre contiene palabras prohibidas",
            roleShort: "Ese rol es demasiado corto",
            roleNotText: "Eso no es un texto",
            roleLong: "Ese rol en demasiado largo",
            roleSQLWords: "Ese rol contiene palabras prohibidas",
        },
        textEn: {
            emailShort: "This email is too short",
            emailNotText: "This is not a text",
            emailLong: "This email is too long",
            emailInvalid: "Email must ends with: @escudero.juridico.es",
            emailSQLWords: "That email contains forbidden words",
            passShort: "This password is too short",
            passNotText: "This is not a text",
            passLong: "This password is too long",
            passSQLWords: "That password contains forbidden words",
            nameShort: "That name is too short",
            nameNotText: "That is not a text",
            nameLong: "That name is too long",
            nameInvalid: "The name can only contain letters",
            nameSQLWords: "That name contains forbidden words",
            roleShort: "That role is too short",
            roleNotText: "That is not a text",
            roleLong: "That role is too long",
            roleSQLWords: "That role contains forbidden words",
        }
    };

    const isText = (text) => typeof text === 'string' || text === '';

    const sqlInjectionRegex = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION|FROM|WHERE|HAVING)\b|['";\-])/i;

    const isValidEmail = (email) => {
        if (email === null || email.length < 22) return messages[language].emailShort;
        else if (!isText(email)) return messages[language].emailNotText;
        else if (email.length > 255) return messages[language].emailLong;
        else if (!email.endsWith('@escudero.juridico.es')) return messages[language].emailInvalid;
        else if (sqlInjectionRegex.test(email)) return messages[language].emailSQLWords;
        else return null;
    };

    const isValidPassword = (pass) => {
        if (pass === null || pass.length < 6) return messages[language].passShort;
        else if (!isText(pass)) return messages[language].passNotText;
        else if (pass.length > 255) return messages[language].passLong;
        else if (sqlInjectionRegex.test(pass)) return messages[language].passSQLWords;
        else return null;
    };

    const isValidName = (name) => {
        if (name === null || name.length < 6) return messages[language].nameShort;
        else if (!isText(name)) return messages[language].nameNotText;
        else if (name.length > 255) return messages[language].nameLong;
        else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]/.test(name)) return messages[language].nameInvalid;
        else if (sqlInjectionRegex.test(name)) return messages[language].nameSQLWords;
        else return null;
    };

    const isValidRole = (role) => {
        if (role === null || role.length < 4) return messages[language].roleShort;
        else if (!isText(role)) return messages[language].roleNotText;
        else if (role.length > 255) return messages[language].roleLong;
        else if (sqlInjectionRegex.test(role)) return messages[language].roleSQLWords; 
        else return null;
    };

    return { isValidEmail, isValidPassword, isValidName, isValidRole };
};

export default Validate;