<script setup>
const emit = defineEmits(['click']);
function handleClick() {
  emit('click')
}
</script>

<template>
  <button type="submit"
          class="cursor-pointer px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
    <slot name="icon">
      <i class="fas fa-save mr-2"></i>
    </slot>
    <span><slot>Save Changes</slot></span>
  </button>
</template>

<style scoped>

</style>