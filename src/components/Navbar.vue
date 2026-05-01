<script setup>
import logo from '@/assets/img/logo.png'
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'

const open = ref(false)
const router = useRouter()


router.afterEach(() => {
  open.value = false
})
</script>

<template>
  <nav class="bg-green-700 border-b border-green-500">

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <div class="flex h-20 items-center justify-between">


        <RouterLink to="/" class="flex items-center space-x-2">
          <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
          <span class="hidden md:block text-white text-2xl font-bold">
            Vue Jobs
          </span>
        </RouterLink>


        <div class="hidden md:flex space-x-2">

          <RouterLink to="/" class="text-white px-3 py-2 rounded-md hover:bg-gray-900 transition"
            exact-active-class="bg-green-900">
            Home
          </RouterLink>

          <RouterLink to="/jobs" class="text-white px-3 py-2 rounded-md hover:bg-gray-900 transition"
            active-class="bg-green-900">
            Jobs
          </RouterLink>

          <RouterLink to="/jobs/add" class="text-white px-3 py-2 rounded-md hover:bg-gray-900 transition"
            exact-active-class="bg-green-900">
            Add Job
          </RouterLink>

        </div>


        <button @click="open = !open" class="md:hidden text-white text-2xl">
          <i :class="open ? 'pi pi-times' : 'pi pi-bars'"></i>
        </button>

      </div>
    </div>


    <div v-if="open" class="md:hidden px-4 pb-4 space-y-2">

      <RouterLink to="/" class="block text-white px-3 py-2 rounded-md hover:bg-gray-900"
        exact-active-class="bg-green-900">
        Home
      </RouterLink>

      <RouterLink to="/jobs" class="block text-white px-3 py-2 rounded-md hover:bg-gray-900"
        active-class="bg-green-900">
        Jobs
      </RouterLink>

      <RouterLink to="/jobs/add" class="block text-white px-3 py-2 rounded-md hover:bg-gray-900"
        exact-active-class="bg-green-900">
        Add Job
      </RouterLink>

    </div>
  </nav>
</template>