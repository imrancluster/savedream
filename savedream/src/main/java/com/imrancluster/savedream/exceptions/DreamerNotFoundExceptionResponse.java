package com.imrancluster.savedream.exceptions;

public class DreamerNotFoundExceptionResponse {

    private String dreamerNotFound;

    public DreamerNotFoundExceptionResponse(String dreamerNotFound) {
        this.dreamerNotFound = dreamerNotFound;
    }

    public String getDreamerNotFound() {
        return dreamerNotFound;
    }

    public void setDreamerNotFound(String dreamerNotFound) {
        this.dreamerNotFound = dreamerNotFound;
    }
}
