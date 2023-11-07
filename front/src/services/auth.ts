import http from './httpClient';

export async function login(credentials: {email: string, password: string}) {
    const { data } = await http.post('/auth/login', credentials);
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
}


export async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token found');
    }

    const { data } = await http.post('/auth/refresh-token', { refreshToken: refreshToken });
    localStorage.setItem('accessToken', data.token); // armazene o novo access token no local storage
}

export default {
    login,
    refreshToken
}
