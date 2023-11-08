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

      <section class="post-info">
        <router-link class="post-info-author" :to="{name: 'user-profile', params: {id: post.author.id}}">Autor: {{post.author.userName}}</router-link>
        <h5 class="post-info-date"> - {{new Date(post.createdAt).toLocaleDateString("pt-BR")}}</h5>
      </section>
      <p v-for="block in post.contentBlocks.sort(item => item.order)">{{block.value}}</p>
    </article>
  </main>
</template>

<style scoped lang="scss">
.post {
  &-info {
    display: flex;

    &-author {
      display: inline-block;
      font-size: 12px;
      margin-bottom: 32px;
      margin-right: 4px;
      color: var(--gray-1);

      &:hover {
        color: var(--secondary-color)
      }
    }

    &-date {
      font-size: 12px;
      margin-bottom: 32px;
      color: var(--gray-1);
      font-weight: 400;
    }
  }


  &-title {
    font-size: 64px;
    text-align: center;
    color: var(--primary-color);
  }
}
</style>