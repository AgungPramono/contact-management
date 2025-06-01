<script setup>
import {useRoute} from "vue-router";
import {useLocalStorage} from "@vueuse/core";
import {onMounted, reactive} from "vue";
import {contactDetail} from "../../lib/api/ContactApi.js";
import {alertConfirm, alertError, alertSuccess} from "../../lib/alert.js";
import {deleteAddress, getAddress, updateAddress} from "../../lib/api/AddressApi.js";
import BackButton from "../widget/BackButton.vue";
import SubmitButton from "../widget/SubmitButton.vue";
import AddressForm from "../widget/AddressForm.vue";

const route = useRoute();
const {id, addressId} = route.params;
const token = useLocalStorage("token", "")

const contact = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: ""
})

const address = reactive({
  street: "",
  city: "",
  province: "",
  country: "",
  postalCode: ""
})

async function handleSubmit() {
  const response = await updateAddress(token.value, id, addressId, address);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    await alertSuccess("Address Updated Successfully")
  } else {
    await alertError(responseBody.errors)
  }
}

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

async function fetchAddress() {
  const response = await getAddress(token.value, id, addressId);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    address.street = responseBody.data.street;
    address.city = responseBody.data.city;
    address.province = responseBody.data.province;
    address.country = responseBody.data.country;
    address.postalCode = responseBody.data.postalCode;
  } else {
    await alertError(responseBody.errors)
  }
}

onMounted(async () => {
  await fetchContact();
  await fetchAddress();
})
</script>

<template>
  <div class="flex items-center mb-6">
    <RouterLink :to="`/dashboard/contacts/${id}`"
                class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
      <i class="fas fa-arrow-left mr-2"></i> Back to Contact Details
    </RouterLink>
    <h1 class="text-2xl font-bold text-white flex items-center">
      <i class="fas fa-map-marker-alt text-blue-400 mr-3"></i> Edit Address
    </h1>
  </div>

  <div
      class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
    <div class="p-8">
      <!-- Contact Information -->
      <div class="mb-6 pb-6 border-b border-gray-700">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
            <i class="fas fa-user text-white"></i>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-white">{{ contact.firstName }} {{ contact.lastName }}</h2>
            <p class="text-gray-300 text-sm">{{ contact.email }} • {{ contact.phone }}</p>
          </div>
        </div>
      </div>
      <AddressForm v-model="address" @submit="handleSubmit">
        <template #buttons>
          <BackButton :to="`/dashboard/contacts/${id}`">
            <template #icon>
              <i class="fas fa-times mr-2"></i>
            </template>
            Cancel
          </BackButton>
          <SubmitButton/>
        </template>
      </AddressForm>
    </div>
  </div>
</template>

<style scoped>

</style>