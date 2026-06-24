<script setup lang="ts">
import type { ServerStatus } from "@/types";

defineProps<{
  status: ServerStatus;
}>();
</script>

<template>
  <div
    class="flex items-center gap-4 rounded-xl border border-white/8 bg-black/40 px-5 py-3 backdrop-blur-md"
  >
    <div class="flex items-center gap-2.5">
      <span
        class="relative flex h-2.5 w-2.5"
        :class="status.online ? '' : 'opacity-50'"
      >
        <span
          v-if="status.online"
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"
        />
        <span
          class="relative inline-flex h-2.5 w-2.5 rounded-full"
          :class="status.online ? 'bg-emerald-400' : 'bg-red-500'"
        />
      </span>
      <span class="text-sm font-medium text-white/90">
        {{ status.online ? "En ligne" : "Hors ligne" }}
      </span>
    </div>

    <div class="h-4 w-px bg-white/10" />

    <div class="flex items-center gap-1.5 text-sm text-white/70">
      <svg class="h-4 w-4 text-nexus-neon" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
        />
      </svg>
      <span>
        <span class="font-semibold text-white">{{ status.playerCount }}</span>
        / {{ status.maxPlayers }} joueurs
      </span>
    </div>

    <div class="hidden h-4 w-px bg-white/10 sm:block" />

    <span class="hidden text-xs text-white/40 sm:block">{{ status.version }}</span>
  </div>
</template>
