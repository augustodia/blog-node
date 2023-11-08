import http from './httpClient';
import {UserDto} from "@/services/dto/post/User";

export async function getMyProfile() {
    const { data } = await http.get<UserDto>('/user/my-profile');

    return data;
}

export async function getUserProfile(id: string): Promise<UserDto> {
    const { data } = await http.get<UserDto>(`/user/get/${id}`);

    return data;
}

export default {
    getMyProfile,
    getUserProfile
}
