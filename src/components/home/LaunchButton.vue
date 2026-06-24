<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const isLaunching = computed(() => userStore.isLaunching);
const progress = computed(() => userStore.launchProgress);

const buttonLabel = computed(() => {
  if (!isLaunching.value) return "JOUER";
  if (progress.value < 100) return `PRÉPARATION… ${progress.value}%`;
  return "LANCEMENT…";
});

async function handleLaunch(): Promise<void> {
  await userStore.launchGame();
}
</script>

<template>
  <button
    type="button"
    class="group relative overflow-hidden rounded-2xl px-16 py-5 text-2xl font-black tracking-[0.2em] transition-all duration-300 disabled:cursor-not-allowed"
    :class="
      isLaunching
        ? 'bg-nexus-surface text-white/70'
        : 'animate-pulse-glow bg-gradient-to-r from-nexus-accent via-purple-600 to-nexus-accent text-white hover:scale-[1.03] active:scale-[0.98]'
    "
    :disabled="isLaunching"
    @click="handleLaunch"
  >
    <!-- Barre de progression -->
    <span
      v-if="isLaunching"
      class="absolute inset-0 bg-gradient-to-r from-nexus-accent/40 to-nexus-neon/30 transition-all duration-300"
      :style="{ width: `${progress}%` }"
    />

    <span class="relative z-10 flex items-center gap-3">
      <svg
        v-if="!isLaunching"
        class="h-7 w-7 transition-transform group-hover:scale-110"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
      {{ buttonLabel }}
    </span>
  </button>
</template>
