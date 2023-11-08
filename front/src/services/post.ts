import http from './httpClient';
import {PostTeaserDto} from "@/services/dto/post/Post.teaser";
import {PostCompleteDto} from "@/services/dto/post/Post.complete";

export async function getAll(): Promise<PostTeaserDto[]> {
    const { data } = await http.get<PostTeaserDto[]>('/post');

    return data;
}

export async function getById(id: string): Promise<PostCompleteDto> {
    const { data } = await http.get<PostCompleteDto>(`/post/${id}`);

    return data;
}

export async function getPostsToUser(id: string): Promise<PostTeaserDto[]>  {
    const { data } = await http.get<PostTeaserDto[]>(`/post/by-user/${id}`);

    return data;
}


export default {
    getAll,
    getById,
    getPostsToUser
}
