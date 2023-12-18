package com.demo.nuxtendemo.DTO;

/**
 * Clase encargada de gestionar la respuesta de una excepcion.
 */
public class ResponseDTO<T> {

    // Atributo encargado de almacenar la respuesta de la excepcion.
    private T data;

    // Atributo encargado de almacenar el mensaje de la excepcion.
    private String message;

    /**
     * Constructor de la clase.
     * @param data
     * @param message
     */
    public ResponseDTO(T data, String message) {
        this.data = data;
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
