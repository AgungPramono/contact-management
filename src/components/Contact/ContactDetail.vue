<script setup>

import {useRoute} from "vue-router";
import {useLocalStorage} from "@vueuse/core";
import {onMounted, reactive, ref} from "vue";
import {contactDetail} from "../../lib/api/ContactApi.js";
import {alertConfirm, alertError, alertSuccess} from "../../lib/alert.js";
import {addressList, deleteAddress} from "../../lib/api/AddressApi.js";
import EditButton from "../widget/EditButton.vue";
import DeleteButton from "../widget/DeleteButton.vue";
import BackButton from "../widget/BackButton.vue";

const route = useRoute();
const {id} = route.params;
const token = useLocalStorage("token", "")
const contact = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: ""
})

const addresses = ref([])

async function fetchAddress() {
  const response = await addressList(token.value, id)
  const responseBody = await response.json()
  console.log(responseBody)

  if (response.status === 200) {
    addresses.value = responseBody.data
  } else {
    await alertError(responseBody.errors)
  }
}


async function handleDeleteAddress(addressId) {
  if (!await alertConfirm("Are you sure you want to delete this address?")) {
    return
  }

  const response = await deleteAddress(token.value, id, addressId);
  const responseBody = await response.json();
  console.log(responseBody);

  if (response.status === 200) {
    await alertSuccess("Address Deleted Successfully")
    await fetchAddress();
  } else {
    await alertError(responseBody.errors)
  }
}


async function fetchContact() {
  const response = await contactDetail(token.value, id)
  const responseBody = await response.json()
  console.log(responseBody)

  if (response.status === 200) {
    contact.firstName = responseBody.data.firstName
    contact.lastName = responseBody.data.lastName
    contact.email = responseBody.data.email
    contact.phone = responseBody.data.phone
  } else {
    await alertError(responseBody.errors)
  }
}

onMounted(async () => {
  await fetchContact()
  await fetchAddress()
})

</script>

<template>
  <div class="flex items-center mb-6">
    <RouterLink to="/dashboard/contacts"
                class="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
      <i class="fas fa-arrow-left mr-2"></i> Back to Contacts
    </RouterLink>
    <h1 class="text-2xl font-bold text-white flex items-center">
      <i class="fas fa-id-card text-blue-400 mr-3"></i> Contact Details
    </h1>
  </div>

  <div
      class="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
    <div class="p-8">
      <!-- Contact Header -->
      <div class="mb-8 text-center">
        <div class="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
          <i class="fas fa-user text-3xl text-white"></i>
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">{{ contact.firstName }} {{ contact.lastName }}</h2>
        <div class="w-24 h-1 bg-gradient mx-auto rounded-full"></div>
      </div>

      <!-- Contact Information -->
      <div class="space-y-5 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
              class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
            <div class="flex items-center mb-2">
              <i class="fas fa-user-tag text-blue-400 mr-2"></i>
              <h3 class="text-gray-300 text-sm font-medium">First Name</h3>
            </div>
            <p class="text-white text-lg ml-6">{{ contact.firstName }}</p>
          </div>
          <div
              class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
            <div class="flex items-center mb-2">
              <i class="fas fa-user-tag text-blue-400 mr-2"></i>
              <h3 class="text-gray-300 text-sm font-medium">Last Name</h3>
            </div>
            <p class="text-white text-lg ml-6">{{ contact.lastName }}</p>
          </div>
        </div>

        <div
            class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
          <div class="flex items-center mb-2">
            <i class="fas fa-envelope text-blue-400 mr-2"></i>
            <h3 class="text-gray-300 text-sm font-medium">Email</h3>
          </div>
          <p class="text-white text-lg ml-6">{{ contact.email }}</p>
        </div>

        <div
            class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
          <div class="flex items-center mb-2">
            <i class="fas fa-phone text-blue-400 mr-2"></i>
            <h3 class="text-gray-300 text-sm font-medium">Phone</h3>
          </div>
          <p class="text-white text-lg ml-6">{{ contact.phone }}</p>
        </div>
      </div>

      <!-- Addresses Section -->
      <div class="mb-8">
        <div class="flex items-center mb-5">
          <i class="fas fa-map-marker-alt text-blue-400 mr-3"></i>
          <h3 class="text-xl font-semibold text-white">Addresses</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Add Address Card -->
          <div
              class="bg-gray-700 bg-opacity-50 p-5 rounded-lg border-2 border-dashed border-gray-600 shadow-md card-hover">
            <RouterLink :to="`/dashboard/contacts/${id}/addresses/create`" class="block h-full">
              <div class="flex flex-col items-center justify-center h-full text-center py-4">
                <div
                    class="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <i class="fas fa-plus text-2xl text-white"></i>
                </div>
                <h4 class="text-lg font-semibold text-white">Add Address</h4>
              </div>
            </RouterLink>
          </div>

          <!-- Address Card 1 -->
          <div v-for="address in addresses" :key="address.id"
               class="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover">
            <div class="flex items-center mb-3">
              <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                <i class="fas fa-home text-white"></i>
              </div>
              <h4 class="text-lg font-semibold text-white">Address</h4>
            </div>
            <div class="space-y-3 text-gray-300 ml-2 mb-4">
              <p class="flex items-center">
                <i class="fas fa-road text-gray-500 w-6"></i>
                <span class="font-medium w-24">Street:</span>
                <span>{{ address.street }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-city text-gray-500 w-6"></i>
                <span class="font-medium w-24">City:</span>
                <span>{{ address.city }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-map text-gray-500 w-6"></i>
                <span class="font-medium w-24">Province:</span>
                <span>{{ address.province }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-flag text-gray-500 w-6"></i>
                <span class="font-medium w-24">Country:</span>
                <span>{{ address.country }}</span>
              </p>
              <p class="flex items-center">
                <i class="fas fa-mailbox text-gray-500 w-6"></i>
                <span class="font-medium w-24">Postal Code:</span>
                <span>{{ address.postalCode }}</span>
              </p>
            </div>
            <div class="flex justify-end space-x-3">
              <EditButton :to="`/dashboard/contacts/${id}/addresses/${address.id}/edit`"/>
              <DeleteButton @click="()=> handleDeleteAddress(address.id)"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4">
        <BackButton :to="`/dashboard/contacts`"/>
        <EditButton :to="`/dashboard/contacts/${id}/edit`">
          <template #icon>
            <i class="fas fa-user-edit mr-2"></i>
          </template>
          Edit Contact
        </EditButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>