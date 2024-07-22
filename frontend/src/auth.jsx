import jwtDecode from 'jwt-decode';

// check if token is expired
export function isTokenExpired(token) {
    if(!token) {
        return true
    }
    const exp = jwtDecode(token);
    return Date.now() >=exp *1000;
}
