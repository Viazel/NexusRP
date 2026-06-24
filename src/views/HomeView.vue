<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import LaunchButton from "@/components/home/LaunchButton.vue";
import ServerStatusBadge from "@/components/common/ServerStatusBadge.vue";
import type { ServerStatus } from "@/types";

const userStore = useUserStore();

const serverStatus = ref<ServerStatus>({
  online: true,
  playerCount: 47,
  maxPlayers: 100,
  version: "Minecraft 1.20.4 · Fabric",
});

const backgroundUrl =
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80";
</script>

<template>
  <div class="relative flex h-full flex-col">
    <!-- Fond dynamique -->
    <div class="absolute inset-0 overflow-hidden">
      <img
        :src="backgroundUrl"
        alt="NexusRP — Ville du serveur"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-nexus-bg/95 via-nexus-bg/70 to-nexus-bg/40" />
      <div class="absolute inset-0 bg-gradient-to-t from-nexus-bg via-transparent to-nexus-bg/30" />
    </div>

    <!-- Contenu -->
    <div class="relative z-10 flex flex-1 flex-col justify-between p-8">
      <!-- En-tête -->
      <div class="animate-[fadeIn_0.6s_ease]">
        <p class="text-xs font-bold uppercase tracking-[0.3em] text-nexus-neon/80">
          Bienvenue,
          <span class="text-nexus-neon">{{ userStore.displayName }}</span>
        </p>
        <h1
          class="mt-1 bg-gradient-to-r from-white via-white to-nexus-accent-light bg-clip-text text-5xl font-black tracking-tight text-transparent"
        >
          NexusRP
        </h1>
        <p class="mt-2 max-w-md text-sm leading-relaxed text-white/50">
          Plongez dans une expérience RolePlay immersive. Construisez votre histoire,
          exercez un métier et façonnez la ville.
        </p>
      </div>

      <!-- Zone de lancement -->
      <div class="flex flex-col items-start gap-6">
        <ServerStatusBadge :status="serverStatus" />
        <LaunchButton />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
