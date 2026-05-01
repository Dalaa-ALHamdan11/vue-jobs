<script setup>
import { reactive, ref, computed, defineProps, onMounted } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
import JobListing from '@/components/JobListing.vue'


defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }, showSearch: {
        type: Boolean,
        default: false
    }
})

const state = reactive({
    jobs: [],
    isLoading: true
})

const search = ref('')


const selectedType = ref('')


onMounted(async () => {
    try {
        const response = await axios.get('https://vue-jobs-api.onrender.com/jobs')
        state.jobs = response.data
    } catch (err) {
        console.error('Error Fetching Jobs', err)
    } finally {
        state.isLoading = false
    }
})


const filteredJobs = computed(() => {
    return state.jobs.filter(job => {
        
        const matchesSearch = job.title
            .toLowerCase()
            .includes(search.value.toLowerCase())


        const matchesType = selectedType.value
            ? job.type === selectedType.value
            : true

        return matchesSearch && matchesType
    })
})
</script>
<template>
    <section  class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">

            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>


            <input v-if="showSearch" v-model="search" type="text" placeholder="Search jobs..."
                class="w-full mb-4 px-4 py-2 border rounded-lg" />


            <select v-if="showSearch" v-model="selectedType" class="w-full mb-6 px-4 py-2 border rounded-lg">
                <option value="">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
            </select>


           <div v-if="state.isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div
    v-for="n in 6"
    :key="n"
    class="bg-white rounded-xl shadow-md p-4 animate-pulse"
  >
    
    <div class="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>

   
    <div class="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>

    
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
    <div class="h-4 bg-gray-300 rounded mb-2"></div>
    <div class="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>

    
    <div class="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>

  
    <div class="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>

   
    <div class="h-8 bg-gray-300 rounded w-1/2"></div>
  </div>
</div>


            <p v-else-if="filteredJobs.length === 0" class="text-center text-gray-500">
                No jobs found
            </p>

            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing v-for="job in filteredJobs.slice(0, limit || filteredJobs.length)" :key="job.id"
                    :job="job" />
            </div>

        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
            View All Jobs
        </RouterLink>
    </section>
    
</template>