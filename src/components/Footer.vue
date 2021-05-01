<template>
  <footer class="bg-cyan-200">
    <div
      class="container flex items-center justify-between px-2 py-4 mx-auto space-x-4 space-y-2 text-blue-700"
    >
      <div class="text-xs">
        favicon made by
        <a
          href="https://www.flaticon.com/authors/prosymbols"
          title="Prosymbols"
          class="text-fuchsia-700"
          >Prosymbols</a
        >
        from
        <a
          href="https://www.flaticon.com/"
          title="FlatIcon"
          class="text text-fuchsia-700"
          >www.flaticon.com</a
        >
      </div>
      <img :src="tmdbLogo" alt="tmdb Logo" class="w-12" />
    </div>
  </footer>
</template>

<script setup>
import tmdbLogo from "~/assets/tmdb.svg"
</script>
