package com.imrancluster.savedream.exceptions;

public class ProfileNotFoundExceptionResponse {

    private String profileNotFound;

    public ProfileNotFoundExceptionResponse(String profileNotFound) {
        this.profileNotFound = profileNotFound;
    }

    public String getProfileNotFound() {
        return profileNotFound;
    }

    public void setProfileNotFound(String profileNotFound) {
        this.profileNotFound = profileNotFound;
    }
}
