<script setup lang="ts">
  import {UserDto} from "@/services/dto/post/User";
  import {PostTeaserDto} from "@/services/dto/post/Post.teaser";
  import PostCard from "@/modules/Home/PostCard.vue";

  const props = defineProps({
    user: {
      type: Object as () => UserDto,
      required: true,
      default: null
    },
    posts: {
      type: Array as () => PostTeaserDto[],
      required: true,
      default: []
    }
  })

</script>

<template>
  <main id="profile-page">
    <section class="profile-info">
      <h1 class="profile-info-user-name">{{user?.userName.toUpperCase()}}</h1>
    </section>
    <section class="profile-posts">
      <h2 class="profile-posts-title">Posts</h2>
      <div class="profile-posts-content">
        <PostCard v-for="post in posts" :key="post.id" :post="post"/>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
#profile-page {
  .profile-info {
    text-align: center;

    &-user-name {
      color: var(--primary-color);
      font-size: 48px;
      margin-bottom: 64px;
    }
  }

  .profile-posts {
    &-title {
      font-size: 24px;
      margin-bottom: 16px;
    }

    &-content {
      display: flex;
      flex-wrap: wrap;
      gap: 20px
    }
  }
}
</style>
