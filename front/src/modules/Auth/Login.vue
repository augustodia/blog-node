<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import AuthService from "@/services/auth";

import TextField from "../../shared/components/TextField.vue";
import ButtonComponent from "../../shared/components/ButtonComponent.vue";

const router = useRouter()
const loading = ref<boolean>(false);
const email = ref<string>('');
const password = ref<string>('');

const login = async () => {
  try {
    loading.value = true;
    await AuthService.login({email: email.value, password: password.value});
    router.push({
      name: 'home'
    });

  } catch(e) {
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <section id="login-page">
    <text-field name="email" title="Email" type="email" v-model="email"/>
    <text-field name="password" title="Senha" type="password" v-model="password"/>
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