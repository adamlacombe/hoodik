<script setup lang="ts">
import { mdiPlus, mdiMinus } from '@mdi/js'
import BaseButton from '@/components/ui/BaseButton.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { Preview } from '!/preview'
import SpinnerIcon from '../ui/SpinnerIcon.vue'

const props = defineProps<{
  modelValue: Preview
}>()
const preview = computed(() => props.modelValue)

const container = ref()
const videoUrl = ref<string>()

const load = async () => {

  const blob = new Blob([await preview.value.load()], { type: preview.value.mime });
  const url = URL.createObjectURL(blob);

  videoUrl.value = url;
}

/**
 * Keydown event handler
 */
const videoKeydown = (e: KeyboardEvent) => {
  
	// TODO [previous / next] controls
	if (e.key === '') {

	}
}

onMounted(() => {
  window.addEventListener('keydown', videoKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', videoKeydown)
})

watch(
  () => props.modelValue,
  () => setTimeout(load, 100),
  { immediate: true }
)
</script>

<template>
  <div ref="container" class="w-[100%] h-[calc(100%+2rem)] video-container">
    <video
      v-if="videoUrl"
      key="original"
      name="original"
      :src="videoUrl"
      :alt="preview.name"
			controls
    />
    <div v-else class="flex justify-center items-center w-full h-full">
      <SpinnerIcon />
    </div>
  </div>
</template>
<style scoped lang="css">
.video-container {
  display: grid;
  align-content: center;
  justify-content: center;
  overflow: scroll;
}

.video-container video {
  height: 80vh;
	width: 100%;
}
</style>
