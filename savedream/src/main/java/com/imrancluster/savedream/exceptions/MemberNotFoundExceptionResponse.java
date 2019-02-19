package com.imrancluster.savedream.exceptions;

public class MemberNotFoundExceptionResponse {
    private String memberNotFound;

    public MemberNotFoundExceptionResponse(String memberNotFound) {
        this.memberNotFound = memberNotFound;
    }

    public String getMemberNotFound() {
        return memberNotFound;
    }

    public void setMemberNotFound(String memberNotFound) {
        this.memberNotFound = memberNotFound;
    }
}
