<script setup lang="ts">
import {computed, PropType} from "vue";

import {PostTeaserDto} from "@/dto/post/Post.teaser";

const props = defineProps({
  post: {
    type: Object as PropType<PostTeaserDto>,
    required: true,
  }
})

const contentTease = computed(() =>`${props.post.contentTeaser}...`)
</script>

<template>
  <router-link :to="{name: 'post', params: {id: post.id}}" class="post-link">
    <article class="post">
      <h2 class="post-title">{{post.title}}</h2>

      <div class="post-info">
        <span class="post-info-author">{{post.author.userName}} -</span>
        <span class="post-info-date">{{new Date(post.createdAt).toLocaleDateString("pt-BR")}}</span>
      </div>

      <p class="post-content">{{contentTease}}</p>
    </article>
  </router-link>
</template>

<style scoped lang="scss">
  .post-link {
    flex: 3 2 300px;
    background-color: var(--black-default);
  }

  .post {
    border-radius: 8px;
    padding: 32px;
    transition: all .2s;

    box-shadow: inset 5px 5px 10px #1d1d1d,
    inset -5px -5px 10px #212121;

    &:hover {
      transform: scale(1.1);
      box-shadow:  5px 5px 10px #1d1d1d,
      -5px -5px 10px #212121;
    }

    &-title {
      font-size: 32px;
      color: var(--primary-color)
    }

    &-info {
      display: flex;

      &-author {
        margin-top: -4px;
        margin-right: 2px;
        font-size: 10px;
        color: var(--gray-1);
      }

      &-author, &-date {
        margin-top: -4px;
        font-size: 10px;
        color: var(--gray-1);
      }

    }


    &-content {
     font-size: 16px;
     margin-top: 16px;
    }
  }
</style>