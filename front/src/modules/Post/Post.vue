<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";

import PostService from "@/services/post";
import {PostCompleteDto} from "@/services/dto/post/Post.complete";

const route = useRoute();
const postId = route.params.id as string;

const post = ref<PostCompleteDto | null>(null)

const getPosts = async () => {
  try {
    post.value = await PostService.getById(postId);
  } catch (e) {

  }
}

getPosts();
</script>

<template>
  <main>
    <article v-if="post" class="post">
      <h1 class="post-title">{{post.title}}</h1>
      <p v-for="block in post.contentBlocks.sort(item => item.order)">{{block.value}}</p>
    </article>
  </main>
</template>

<style scoped lang="scss">
.post {
  &-title {
    font-size: 64px;
    text-align: center;
  }
}
</style>