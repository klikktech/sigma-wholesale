package com.klikk.sigma.exception;

public class UnauthorisedException extends RuntimeException {

    public UnauthorisedException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public UnauthorisedException(String msg) {
        super(msg);
    }

    public UnauthorisedException(Throwable cause) {
        super(cause);
    }
}
