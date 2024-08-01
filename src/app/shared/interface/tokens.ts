export interface JwtTokens {
    access_token: string;
    refresh_token: string;
}

export interface JwtResponse {
    exp: string;
    iat: string;
}