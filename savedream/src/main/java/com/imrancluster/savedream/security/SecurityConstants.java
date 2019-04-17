package com.imrancluster.savedream.security;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/api/v1/users/**";

    public static final String H2_URL = "h2-console/**";

    public static final String SECRET = "SecretKeyToGenJWTs";

    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String HEADER_STRINGS = "Authorization";

    public static final long EXPIRATION_TIME = 3000_000; // 300_000 = 60 seconds
}
