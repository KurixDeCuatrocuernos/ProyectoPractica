package com.asesoria.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validator {
	
	/**
	 * Método para comprobar si un String es un email
	 * @param email texto recibido para comprobar
	 * @return devuelve true si el texto es un email y false si no lo es
	 */
	private static boolean isEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

	/**
	 * Este método emplea una expresión regular para verificar si el input contiene o no verbos SQL
	 * @param input String con la información que se comparará
	 * @return Devuelve true si contiene algún verbo SQL y false si no.
	 */
	private static boolean hasSQLInjection(String input) {
        String regex = "(?i)\\b(select|insert|update|delete|drop|truncate|exec|union|create|alter|--|;|\\*|\\bor\\b|\\band\\b|\\bwhere\\b)\\b";
        if (input == null || input.isEmpty()) {
            return false;
        }
        return Pattern.compile(regex).matcher(input).find();
    }
	
	/**
	 * Este método emplea una expresión regular para verificar si el input contiene o no texto, números, guión-bajo y/o exclamación
	 * @param input texto que se verificará
	 * @return true si sólo contiene los elementos de la expresión regular false si contiene algún otro
	 */
	private static boolean isTextWithUnderline(String input) {
        String regex = "^[A-Za-z0-9_!.¿?-#$&]+$";
        return input.matches(regex);
    }
	
	private static Character getFirstInvalidCharacter(String input) {
	    String regex = "[A-Za-z0-9_!.¿?\\-#$&]";

	    for (char c : input.toCharArray()) {
	        if (!String.valueOf(c).matches(regex)) {
	            return c; // Devuelve el primer carácter inválido
	        }
	    }

	    return null; // Todos los caracteres son válidos
	}
	
	private static boolean isText(String input) {
        String regex = "^[A-Za-z]+$";
        return input.matches(regex);
    }

	public String isValidEmail(String text) {
		if (text == null || text.length() < 9) {
			return "This email is too short";
		} else if (!isEmail(text)) {
			return "This is not a valid email";
		} else if (text.length() > 254){
			return "This email is too long";
		} else if (hasSQLInjection(text)) {
			return "This email contains invalid expressions";
		} else {
			return null;
		}
	}
	
	public String isValidPassword(String text) {
		if (text == null || text.length() < 5) {
			return "This password is too short";
		} else if (text.length() > 19) {
			return "This password is too long";
		} else if (hasSQLInjection(text)) {
			return "This password contains invalid expressions";
		} else if (isTextWithUnderline(text)) {
			Character firstInvalidCharacter = getFirstInvalidCharacter(text);
			return "This password contains invalid characters: "+firstInvalidCharacter;
		} else {
			return null;
		}
	}
	
	public String isValidName(String text) {
		if (text == null || text.length() < 3) {
			return "This name is too short";
		} else if (text.length() > 254){
			return "This email is too long";
		} else if (hasSQLInjection(text)) {
			return "This email contains invalid expressions";
		} else if (!isText(text)) {
			return "Name only contains letters";
		} else {
			return null;
		}
	}
	
}
