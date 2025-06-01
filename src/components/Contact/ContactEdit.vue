<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import {useLocalStorage} from "@vueuse/core";
import {contactDetail, contactUpdate} from "../../lib/api/ContactApi.js";
import {alertError, alertSuccess} from "../../lib/alert.js";
import BackButton from "../widget/BackButton.vue";
import SubmitButton from "../widget/SubmitButton.vue";
import ContactForm from "../widget/ContactForm.vue";

const route = useRoute();
const {id} = route.params;
const token = useLocalStorage("token", "")
const contact = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: ""
})

async function fetchContact() {
  const response = await contactDetail(token.value, id);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    contact.firstName = responseBody.data.firstName;
    contact.lastName = responseBody.data.lastName;
    contact.email = responseBody.data.email;
    contact.phone = responseBody.data.phone;
  } else {
    await alertError(responseBody.errors)
  }
}

async function handleSubmit() {
  const response = await contactUpdate(token.value, id, contact);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    await alertSuccess("Contact Updated Successfully")
  } else {
    await alertError(responseBody.errors)
  }
}

onMounted(async () => {
  await fetchContact();
})

</script>

<template>
  <div class="flex items-center mb-6">
    <RouterLink to="/dashboard/contacts"
                class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
      <i class="fas fa-arrow-left mr-2"></i> Back to Contacts
    </RouterLink>
    <h1 class="text-2xl font-bold text-white flex items-center">
      <i class="fas fa-user-edit text-blue-400 mr-3"></i> Edit Contact
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
          <SubmitButton/>
        </template>
      </ContactForm>
    </div>
  </div>
</template>

<style scoped>

</style>