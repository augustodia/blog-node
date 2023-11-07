<script setup lang="ts">
import {PropType} from "vue/dist/vue";
import {computed, ref, watch} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

type ButtonColorType = 'primary' | 'secondary' | 'danger'

const colors = {
  primary: {
    backgroundColor: '--primary-bg-color',
    color: '--black-default',
  },
  secondary: {
    backgroundColor: '--secondary-bg-color',
    color: '--white-color',
  },
  danger: {
    backgroundColor: '--danger-bg-color',
    color: '--white-color',
  }
}

const loading = ref<HTMLElement | null>(null);
const button = ref<HTMLButtonElement | null>(null);

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  type: {
    type: String as PropType<ButtonColorType>,
    default: 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: null
  },
  width: {
    type: String,
    default: null
  }
})

const buttonStyle = computed(() => ({backgroundColor: `var(${colors[props.type].backgroundColor})`, width: props.width}))
const textStyle = computed(() => ({color: `var(${colors[props.type].color})`}))
const loadingStyle = computed(() => ({borderTopColor: `var(${colors[props.type].color})`}))

watch(() => props.loading, (value) => {
  if(value) {
    button.value?.classList.add('is-loading');
    loading.value?.classList.add('active');
  } else {
    button.value?.classList.remove('is-loading');
    loading.value?.classList.remove('active');
  }

});

</script>

<template>
  <button class="button" ref="button" :style="buttonStyle">
    <span  class="text" :style="textStyle">
      {{props.title}}
      <font-awesome-icon v-if="icon" :icon="icon" />
    </span>
    <span class="loading" ref="loading" :style="loadingStyle"></span>
  </button>
</template>

<style scoped>
.button {
  font-weight: 600;
  letter-spacing: 1px;

  padding: 16px;

  border-radius: 8px;
  border: none;

  font-size: 16px;

  position: relative;

  &:hover {
    cursor: pointer;
    opacity: .7;
  }

  &.is-loading {
    .text {
      transition: all .4s;
      opacity: 0;
      visibility: hidden;
    }
  }

  .loading {
    opacity: 0;
    visibility: hidden;

    position: absolute;
    width: 32px;
    height: 32px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-radius: 50%;
    animation: loading-spinner 1s linear infinite;
    transition: all .2s;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }

}

@keyframes loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}

</style>