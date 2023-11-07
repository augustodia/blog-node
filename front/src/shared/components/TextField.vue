<script setup lang="ts">
import {PropType} from "vue";

type TextFieldType = 'text' | 'password' | 'email'

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  type: {
    type: String as PropType<TextFieldType>,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  let target = event.target as HTMLInputElement;

  emit('update:modelValue', target.value)
}

</script>

<template>
  <div class="text-field">
    <p v-if="props.title" class="field-title">{{props.title}}</p>
    <input class="text-field-input" :type="type" v-bind="$attrs" :value="modelValue" @input="updateValue">
  </div>
</template>

<style scoped lang="scss">
.text-field {
  width: 100%;
  margin-bottom: 12px;

  .field-title {
    margin-bottom: 8px;
  }

  .text-field-input {
    width: 100%;
    border-style: none;

    border-radius: 4px;
    padding: 8px;

    font-size: 16px;

    color: var(--black-default);
  }
}
</style>
