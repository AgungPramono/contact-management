<script setup>
const emit = defineEmits(['click']);

function handleClick() {
  emit('click')
}
</script>

<template>
  <button
      @click="handleClick" type="button"
      class="cursor-pointer px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2
      focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center min-w-[80px]">
    <i class="fas fa-trash-alt mr-2"></i>
    <span><slot>Delete</slot></span>
  </button>
</template>

<style scoped>

</style>