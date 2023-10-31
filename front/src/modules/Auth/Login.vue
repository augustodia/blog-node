<script setup lang="ts">
import {ref} from "vue";

import TextField from "../../shared/components/TextField.vue";
import ButtonComponent from "../../shared/components/ButtonComponent.vue";

const loading = ref(false);

const login = () => {
  loading.value = true;

  setTimeout(() => loading.value = false,5000);
}

</script>

<template>
  <section id="login-page">
    <text-field name="email" title="Email" />
    <text-field name="password" title="Senha" type="password"/>
    <a id="new-account" href="#">Não tem uma conta? Cadastre-se</a>

    <button-component title="ENTRAR" :loading="loading" @click="login"/>
  </section>
</template>

<style scoped lang="scss">
#login-page {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  #new-account {
    font-size: 14px;
  }
}


</style>