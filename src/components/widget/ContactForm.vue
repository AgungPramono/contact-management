<script setup>

const contact = defineModel({
    type: Object,
    required: true
})

const emit = defineEmits(['submit'])

function handleSubmit() {
  emit('submit', {...contact.value})
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
      <!-- First Name -->
      <div>
        <label for="first_name" class="block text-gray-300 text-sm font-medium mb-2">First Name</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-user-tag text-gray-500"></i>
          </div>
          <input type="text" id="first_name" v-model="contact.firstName"
                 class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                 placeholder="Enter first name" required>
        </div>
      </div>

      <!-- Last Name -->
      <div>
        <label for="last_name" class="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i class="fas fa-user-tag text-gray-500"></i>
          </div>
          <input type="text" id="last_name" v-model="contact.lastName"
                 class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                 placeholder="Enter last name" required>
        </div>
      </div>
    </div>

    <!-- Email -->
    <div class="mb-5">
      <label for="email" class="block text-gray-300 text-sm font-medium mb-2">Email</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="fas fa-envelope text-gray-500"></i>
        </div>
        <input type="email" id="email" v-model="contact.email"
               class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
               placeholder="Enter email address" required>
      </div>
    </div>

    <!-- Phone -->
    <div class="mb-6">
      <label for="phone" class="block text-gray-300 text-sm font-medium mb-2">Phone</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="fas fa-phone text-gray-500"></i>
        </div>
        <input type="tel" id="phone" v-model="contact.phone"
               class="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
               placeholder="Enter phone number" required>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex justify-end space-x-4">
      <slot name="buttons"/>
    </div>
  </form>
</template>

<style scoped>

</style>