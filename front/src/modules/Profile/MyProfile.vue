<script setup lang="ts">
import {onMounted, ref} from "vue";
import {UserDto} from "@/services/dto/post/User";
import UserService from '@/services/user';
import PostService from '@/services/post';
import {PostTeaserDto} from "@/services/dto/post/Post.teaser";
import ProfileInfo from "@/modules/Profile/ProfileInfo.vue";

const myProfile = ref<UserDto | undefined>(undefined);
const posts = ref<PostTeaserDto[]>([]);

const getProfile = async () => myProfile.value = await UserService.getMyProfile();
const getPosts = async () => {
  const userId = myProfile.value?.id;

  if(userId) posts.value = await PostService.getPostsToUser(userId);
}


onMounted(async() => {
  await getProfile();
  await getPosts();
})


</script>

<template>

    <ProfileInfo :user="myProfile" :posts="posts"/>

</template>

<style scoped lang="scss">

</style>