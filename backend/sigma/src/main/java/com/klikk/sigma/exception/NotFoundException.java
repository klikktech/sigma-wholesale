package com.klikk.sigma.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String msg,Throwable cause){
        super(msg,cause);
    }

    public NotFoundException(String msg){
        super(msg);
    }

    public NotFoundException(Throwable cause){
        super(cause);
    }
}
