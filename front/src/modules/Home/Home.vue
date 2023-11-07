<script setup lang="ts">
import {ref} from "vue";
import PostService from "@/services/post";
import {PostTeaserDto} from "@/dto/post/Post.teaser";
import PostCard from "@/modules/Home/PostCard.vue";

const posts = ref<PostTeaserDto[]>([]);

const getPosts = async () => {
  try {
    posts.value = await PostService.getAll();
  } catch (e) {

  }
}

getPosts();

</script>

<template>
  <main id="home">
    <PostCard v-for="post in posts" :post="post" :key="post.id"/>
  </main>
</template>

<style scoped lang="scss">
  #home {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
</style>