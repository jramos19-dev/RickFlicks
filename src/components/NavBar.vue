<template>
  <nav class="bg-cyan-200">
    <div class="containter flex items-center justify-between mx-auto">
      <div class="flex items-center space-x-4">
        <noto:videocassette class="h-16 w-16" />
        <p
          class="text-4xl tracking-wider text-transparent font-extralight bg-clip-text bg-violet-900"
        >
          Movies<span>DataBase</span>
        </p>
      </div>
      <div>
        <div v-if="isAuthenticated" class="flex items-center space-x-4">
          <p class="text-blue-700">Welcome {{ user }}</p>
          <button
            @click="signOut"
            class="px-8 py-2 font font-semibold bg-red-600 rounded-full focus:ring-4 focus :outline-none text-blue-800 hover:bg-red-800"
          >
            Logout
          </button>
        </div>
        <div v-else>
          <button
            @click="signIn"
            class="px-8 py-2 font font-semibold bg-green-600 rounded-full focus:ring-4 focus :outline-none text-blue-800 hover:bg-green-800"
          >
            login
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue"

const isAuthenticated = ref(false)
const user = ref("")

const signIn = () => {
  isAuthenticated.value = true
  user.value = "Jorge"
}

const signOut = () => {
  isAuthenticated.value = false
  user.value = ""
}
</script>
