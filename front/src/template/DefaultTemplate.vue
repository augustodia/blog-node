<script setup lang="ts">

</script>

<template>
  <main id="auth-page">
    <h1>Menu</h1>

    <section id="page-content">
      <router-view></router-view>
    </section>
  </main>
</template>

<style scoped>
#auth-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

#page-content {
  width: 100%;
}

</style>