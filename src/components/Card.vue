<template>
  <div class="flex max-w-full">
    <img
      :src="`${posterBaseURL}${movie.poster_path}`"
      :alt="`Poster of ${movie.title}`"
    />
    <div
      class="flex flex-col justify-between p-4 leading-normal border-b border-l border-r rounded-b bg-coolGray-100 border-coolGray-400 lg:border-l-0 lg:border-t lg:border-coolGray-400 lg:rounded-b-none lg:rounded-r"
    >
      <div class="mb-8">
        <div class="mb-2 text-xl font-bold text-blue-900">
          {{ movie.title }}
        </div>
        <p class="text-base text-coolGray-700 line-clamp-6">
          {{ movie.overview }}
        </p>
      </div>
      <div class="flex items-start justify-end">
        <div class="flex flex-col items-center">
          <button @click="newLike" class="text-coolGray-400 hover:text-red-600">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21s-7-4.35-9.33-8.28C.54 9.07 2.24 5.5 5.88 4.6c1.86-.46 3.63.16 4.88 1.44 1.25-1.28 3.02-1.9 4.88-1.44 3.64.9 5.34 4.47 3.21 8.12C19 16.65 12 21 12 21z" />
            </svg>
            <span>{{ likes }}</span>
          </button>
        </div>
        <div class="flex flex-col items-center">
          <button @click="toggle" class="text-coolGray-400 hover:text-blue-600">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  <Comments v-if="value" @close="toggle" :movie="movie" />
</template>

<script setup>
import { defineProps, ref, onMounted, toRefs, watch } from 'vue'
import { useToggle } from '@vueuse/core'

import Comments from '~/components/Comments.vue'
import { posterBaseURL } from '~/helpers/useMovies'
import { countByObjectId, add } from '~/helpers/useLikes'
import { authentication } from '~/helpers/useFirebase'

const [value, toggle] = useToggle(false)

const { user } = authentication()

const props = defineProps({
  movie: {
    type: Object,
    default: () => {
      return {
        title: '',
        overview: '',
        poster_path: '',
        id: '',
      }
    },
  },
})

const newLike = async () => {
  await add({ objectId: props.movie.id.toString(), userId: user.value.uid })
  await getLikes()
}

const likes = ref(0)

const getLikes = async () => {
  const response = await countByObjectId(props.movie.id.toString())
  const { data } = response
  if (data) likes.value = data.count
}

onMounted(() => {
  getLikes()
})

const { movie } = toRefs(props)

watch(movie, () => {
  getLikes()
})
</script>
