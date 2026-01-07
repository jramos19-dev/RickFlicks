<template>
  <NavBar />
  <Home v-if="isAuthenticated" />
  <EmptyHome v-else />
  <Footer />
</template>

<script setup>
  import NavBar from '~/components/NavBar.vue'
  import Home from '~/components/Home.vue'
  import EmptyHome from '~/components/EmptyHome.vue'
  import Footer from '~/components/Footer.vue'
  import { authentication } from '~/helpers/useFirebase'

  const { isAuthenticated } = authentication()
</script>
