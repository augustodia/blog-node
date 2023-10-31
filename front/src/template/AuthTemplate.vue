<script setup lang="ts">

</script>

<template>
  <main id="auth-page">
    <div class="logo">
      <img src="../assets/vue.svg" alt="Logotipo Vue"/>
    </div>

    <section id="auth-page-content">
      <slot name="default"></slot>
    </section>
  </main>
</template>

<style scoped>
#auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
}

#auth-page-content {
  width: 100%;
}

.logo {
  width: 100px;
  height: 100px;

  margin-bottom: 32px;
}
</style>