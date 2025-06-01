<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <RouterLink :to="to"
              class="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
    <!-- icon default-->
    <slot name="icon">
      <i class="fas fa-arrow-left mr-2"></i>
    </slot>
    <slot>Back</slot>
  </RouterLink>
</template>

<style scoped>

</style>