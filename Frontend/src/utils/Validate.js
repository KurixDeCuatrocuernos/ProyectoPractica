class Validate {

    /*This function checks if the value is a text (String)*/
    static isText(text) {
        if (typeof text === 'string' || typeof text === '') {
            return true
        } else {
            return false
        }
    }

    static isNumber(value) {
        if (typeof value === 'string') {
            value = value.replace(',', '.');
        }
        return !isNaN(value) && !isNaN(parseFloat(value));
    }

    static isValidEmail(email) {
        if (email === null || email.length<22) return "This email is too short"
        else if(!this.isText(email)) return "This is not a text"
        else if(email.length > 255) return "This email is too long"
        else if(!email.endsWith('@escudero.juridico.es')) return "This email do not ends with: ...@escudero.juridico.es"
        else return null
    }

    static isValidPassword(pass) {
        if (pass === null || pass.length<6) return "This password is too short"
        else if(!this.isText(pass)) return "This is not a text"
        else if(pass.length > 255) return "This password is too long"
        // else if (pass === "123456") return "This password is too easy"
        else return null
    }

    

}

export default Validate