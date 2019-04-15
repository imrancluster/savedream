package com.imrancluster.savedream.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleDreamerPrimaryMobileExceptoin(DreamerPrimaryMobileException ex, WebRequest request) {

        DreamerPrimaryMobileExceptionReponse exceptionReponse = new DreamerPrimaryMobileExceptionReponse(ex.getMessage());
        return new ResponseEntity(exceptionReponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleDreamerNotFoundException(DreamerNotFoundException ex, WebRequest request) {

        DreamerNotFoundExceptionResponse exceptionResponse = new DreamerNotFoundExceptionResponse(ex.getMessage());

        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleMemberNotFoundExeception(MemberNotFoundRexception ex, WebRequest request) {

        MemberNotFoundExceptionResponse exceptionResponse = new MemberNotFoundExceptionResponse(ex.getMessage());

        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProfileNotFoundException(ProfileNotFoundException ex, WebRequest request) {

        ProfileNotFoundExceptionResponse exceptionResponse = new ProfileNotFoundExceptionResponse(ex.getMessage());

        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameAlreadyExists(UsernameAlreadyExistsExecption ex, WebRequest request) {

        UsernameAlreadyExistsResponse exceptionResponse = new UsernameAlreadyExistsResponse(ex.getMessage());

        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
