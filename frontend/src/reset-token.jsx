import { jwtDecode } from 'jwt-decode';

// check if token is expired
export function isTokenExpired(token) {
    if(!token) {
        return true
    }
    
    const decodedToken = jwtDecode(token);

    // expiration time
    const exp = decodedToken.exp;
    if (!exp) {
        localStorage.removeItem('token');
        return true;
    }

    // compare time date now
    // if its greater or equal than token expiration time remove login keys from localstorage
    if (Date.now() >= exp * 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId')
        return true;
    }
    // if none of the conditions were met, return false, token is still valid
    return false;
}

// check if authentication token is valid
export const checkAuthenticationToken = () => {
    const token = localStorage.getItem("token");
    if(!token || isTokenExpired(token)) {
        return false;
    }
    return true;
}

// reset token 
export async function resetToken(refreshToken) {
    if (!checkAuthenticationToken()) {
        throw new Error('Authentication token is invalid or expired');
    }
    
    try {
        const response = await fetch('/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const { accessToken } = await response.json();
        localStorage.setItem('token', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
}
