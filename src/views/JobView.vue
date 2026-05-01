<script setup>
import axios from 'axios';
import { reactive, onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import BackButton from '@/components/BackButton.vue';
import { useFavorites } from '@/composables/useFavorites'

const { toggleFavorite, isFavorite } = useFavorites()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const jobId = route.params.id
const state = reactive({
  job: {},
  isLoading: true
})
onMounted(async () => {
  try {
    const response = await axios.get(`https://vue-jobs-api.onrender.com/jobs/${jobId}`)
    state.job = response.data
  } catch (err) {
    console.error('Error in fetching job', err);
  } finally {
    state.isLoading = false
  }
})

const deleteJob = async () => {
  try {
    const confirm = window.confirm('Are You Sure You Want To Delete This Job?')
    if (confirm) {
      await axios.delete(`https://vue-jobs-api.onrender.com/jobs/${jobId}`)
      toast.success('Job Deleted Successfully')
      router.push('/jobs')
    }
  }
  catch (err) {
    console.error('Error Deleting Job', err);
    toast.error('Job Not Deleted')
  }
}

</script>
<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4 flex  justify-between items-center">{{ state.job.type }}
              <button @click="toggleFavorite(state.job.id)" class="hover:scale-110 transition text-xl">
                <i :class="isFavorite(state.job.id) ? 'pi pi-star-fill text-yellow-400' : 'pi pi-star'"></i>
              </button>
            </div>
            <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="pi pi-map-marker  text-orange-700 mr-2 text-xl"></i>
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>
            <p class="mb-4">
              {{ state.job.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ state.job.salary }} / Year</p>
          </div>
        </main>

        
        <aside>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ state.job.company.title }}</h2>

            <p class="my-2">
              {{ state.job.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">{{ state.job.company.contactPhone }}</p>
          </div>

          
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink :to="`/jobs/${state.job.id}/edit`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Edit Job</RouterLink>
            <button @click="deleteJob"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
  <section v-else class="bg-green-50">
  <div class="container m-auto py-10 px-6">
    <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6 animate-pulse">

      <!-- 🟢 MAIN -->
      <main>
        <!-- card 1 -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="h-4 bg-gray-300 w-1/4 mb-4 rounded"></div>
          <div class="h-8 bg-gray-300 w-2/3 mb-4 rounded"></div>
          <div class="h-4 bg-gray-300 w-1/3 rounded"></div>
        </div>

        <!-- card 2 -->
        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
          <div class="h-5 bg-gray-300 w-1/3 mb-6 rounded"></div>

          <div class="h-4 bg-gray-300 mb-3 rounded"></div>
          <div class="h-4 bg-gray-300 mb-3 rounded"></div>
          <div class="h-4 bg-gray-300 w-3/4 mb-6 rounded"></div>

          <div class="h-5 bg-gray-300 w-1/4 mb-2 rounded"></div>
          <div class="h-4 bg-gray-300 w-1/3 rounded"></div>
        </div>
      </main>

      <!-- 🟡 SIDEBAR -->
      <aside>
        <!-- company -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="h-6 bg-gray-300 w-1/2 mb-6 rounded"></div>

          <div class="h-5 bg-gray-300 w-2/3 mb-3 rounded"></div>
          <div class="h-4 bg-gray-300 mb-2 rounded"></div>
          <div class="h-4 bg-gray-300 mb-4 rounded"></div>

          <div class="h-4 bg-gray-300 w-1/3 mb-2 rounded"></div>
          <div class="h-4 bg-gray-300 w-1/2 mb-4 rounded"></div>

          <div class="h-4 bg-gray-300 w-1/3 mb-2 rounded"></div>
          <div class="h-4 bg-gray-300 w-1/2 rounded"></div>
        </div>

        <!-- manage -->
        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
          <div class="h-6 bg-gray-300 w-1/2 mb-6 rounded"></div>

          <div class="h-10 bg-gray-300 rounded mb-4"></div>
          <div class="h-10 bg-gray-300 rounded"></div>
        </div>
      </aside>

    </div>
  </div>
</section>
</template>