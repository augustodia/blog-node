import http from './httpClient';

export async function login(credentials: {email: string, password: string}) {
    const { data } = await http.post('/auth/login', credentials);
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userName', data.userInfo.userName);
}
export async function refreshToken() {
    try {


    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token found');
    }

    const { data } = await http.post('/auth/refresh-token', { refreshToken: refreshToken });
    localStorage.setItem('accessToken', data.token);
    } catch (e) {
        throw e;
    }
}

export function logoff() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
}

export default {
    login,
    refreshToken,
    logoff
}
