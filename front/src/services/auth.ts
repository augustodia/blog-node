import http from './httpClient';

export async function login(username: string, password: string) {
    const { data } = await http.post('/auth/login', { username, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
}


export async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token found');
    }

    const { data } = await http.post('/refresh-token', { token: refreshToken });
    localStorage.setItem('accessToken', data.accessToken); // armazene o novo access token no local storage
}

export default {
    login,
    refreshToken
}
