package com.imrancluster.savedream.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameAlreadyExistsExecption extends RuntimeException {
    public UsernameAlreadyExistsExecption(String message) {
        super(message);
    }
}
