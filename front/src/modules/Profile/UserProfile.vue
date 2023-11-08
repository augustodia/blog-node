<script setup lang="ts">
import {onMounted, ref} from "vue";
import {UserDto} from "@/services/dto/post/User";
import UserService from '@/services/user';
import PostService from '@/services/post';
import {PostTeaserDto} from "@/services/dto/post/Post.teaser";
import ProfileInfo from "@/modules/Profile/ProfileInfo.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const userId = route.params.id as string;

const userProfile = ref<UserDto | undefined>(undefined);
const posts = ref<PostTeaserDto[]>([]);

const getProfile = async () => userProfile.value = await UserService.getUserProfile(userId);
const getPosts = async () => {
  const userId = userProfile.value?.id;

  if(userId) posts.value = await PostService.getPostsToUser(userId);
}


onMounted(async() => {
  await getProfile();
  await getPosts();
})


</script>

<template>
    <ProfileInfo :user="userProfile" :posts="posts"/>
</template>

<style scoped lang="scss">

</style>