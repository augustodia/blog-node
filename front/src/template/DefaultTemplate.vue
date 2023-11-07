<script setup lang="ts">

import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import AuthService from '@/services/auth';
import ButtonComponent from "@/shared/components/ButtonComponent.vue";

const router = useRouter();
const route = useRoute();

const hasGoBackBtn = computed(() => !!route.meta.showGoBackBtn);

const hasLogged = !!localStorage.getItem('accessToken');
const userName = localStorage.getItem('userName') ?? 'Perfil';
const goToLoginPage = () => {
  router.push({name: 'login'})
}

const logoff = () => {
  AuthService.logoff();

  router.push({name: 'login'});
}

const goBack = () => {
  router.back();
}
</script>

<template>
  <main id="default-page">
    <header id="menu">
      <div v-if="hasGoBackBtn" class="go-back">
        <font-awesome-icon icon="fa-solid fa-arrow-left" size="2xl" @click="goBack"/>
      </div>
      <div class="auth-btns">
        <template v-if="hasLogged">
          <button-component class="btn-profile" :title="userName"/>
          <button-component icon="fa-solid fa-power-off" type="danger" @click="logoff"/>
        </template>
        <button-component v-else title="Login" @click="goToLoginPage"/>
      </div>
    </header>

    <section id="page-content">
      <router-view></router-view>
    </section>
  </main>
</template>

<style scoped lang="scss">
#default-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  #menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 128px;
    height: 50px;

    .go-back {
      cursor: pointer;
      padding: 16px;
      font-size: 24px;

      &:hover {
        opacity: 0.6;
      }
    }
    .auth-btns {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      .btn-profile {
        margin-right: 8px;
      }
    }

  }

  #page-content {
    width: 100%;
  }
}



</style>