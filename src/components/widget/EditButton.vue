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
              class="cursor-pointer px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2
               focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center min-w-[80px]">
    <slot name="icon">
      <i class="fas fa-edit mr-2"></i>
    </slot>
    <slot>Edit</slot>
  </RouterLink>
</template>

<style scoped>

</style>