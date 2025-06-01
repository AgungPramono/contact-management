<script setup>
import {reactive} from "vue";
import {ContactCreate} from "../../lib/api/ContactApi.js";
import {useLocalStorage} from "@vueuse/core";
import {alertError, alertSuccess} from "../../lib/alert.js";
import {useRouter} from "vue-router";
import BackButton from "../widget/BackButton.vue";
import SubmitButton from "../widget/SubmitButton.vue";
import ContactForm from "../widget/ContactForm.vue";

const router = useRouter()
const token = useLocalStorage("token", "")
const contact = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: ""
})

async function handleSubmit() {
  const response = await ContactCreate(token.value, contact)
  const responseBody = await response.json()
  console.log(responseBody)

  if (response.status === 200) {
    await alertSuccess("Contact Created Successfully")
    await router.push({
      path: '/dashboard/contacts'
    })
  } else {
    await alertError(responseBody.errors)
  }

}

</script>

<template>

  <div class="flex items-center mb-6">
    <RouterLink to="/dashboard/contacts"
                class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
      <i class="fas fa-arrow-left mr-2"></i> Back to Contacts
    </RouterLink>
    <h1 class="text-2xl font-bold text-white flex items-center">
      <i class="fas fa-user-plus text-blue-400 mr-3"></i> Create New Contact
    </h1>
  </div>

  <div
      class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
    <div class="p-8">
      <ContactForm v-model="contact" @submit="handleSubmit">
        <template #buttons>
          <BackButton :to="`/dashboard/contacts`">
            <template #icon>
              <i class="fas fa-times mr-2"></i>
            </template>
            Cancel
          </BackButton>
          <SubmitButton>
            <template #icon>
              <i class="fas fa-plus-circle mr-2"></i>
            </template>
            Create Contact
          </SubmitButton>
        </template>
      </ContactForm>
    </div>
  </div>
</template>
<style scoped>

</style>