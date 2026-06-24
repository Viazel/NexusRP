<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

interface NavItem {
  name: string;
  label: string;
  icon: "home" | "news" | "profile";
}

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const navItems: NavItem[] = [
  { name: "home", label: "Jouer", icon: "home" },
  { name: "news", label: "Actualités", icon: "news" },
  { name: "profile", label: "Profil", icon: "profile" },
];

const activeRoute = computed(() => route.name as string);

function navigate(name: string): void {
  router.push({ name });
}

function handleLogout(): void {
  userStore.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <aside
    class="flex w-[72px] shrink-0 flex-col items-center border-r border-white/6 bg-nexus-surface/80 py-5 backdrop-blur-xl"
  >
    <!-- Logo -->
    <div class="mb-8 flex flex-col items-center gap-1">
      <div
        class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-nexus-accent to-nexus-neon shadow-lg shadow-nexus-accent/30"
      >
        <span class="text-lg font-black tracking-tighter text-white">N</span>
      </div>
      <span class="text-[9px] font-bold uppercase tracking-widest text-white/30">RP</span>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-1 flex-col items-center gap-2">
      <button
        v-for="item in navItems"
        :key="item.name"
        type="button"
        class="group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200"
        :class="
          activeRoute === item.name
            ? 'bg-nexus-accent/20 text-nexus-neon shadow-inner shadow-nexus-accent/10'
            : 'text-white/40 hover:bg-white/5 hover:text-white/80'
        "
        :title="item.label"
        @click="navigate(item.name)"
      >
        <!-- Indicateur actif -->
        <span
          v-if="activeRoute === item.name"
          class="absolute -left-px top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-nexus-neon"
        />

        <!-- Icône Accueil -->
        <svg
          v-if="item.icon === 'home'"
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <!-- Icône Actualités -->
        <svg
          v-else-if="item.icon === 'news'"
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2"
          />
        </svg>

        <!-- Icône Profil -->
        <svg
          v-else
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>

        <!-- Tooltip -->
        <span
          class="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-nexus-surface px-2.5 py-1 text-xs font-medium text-white/80 opacity-0 shadow-xl transition-opacity group-hover:opacity-100"
        >
          {{ item.label }}
        </span>
      </button>
    </nav>

    <!-- Compte connecté -->
    <div v-if="userStore.account" class="mb-4 flex flex-col items-center gap-1.5">
      <img
        :src="userStore.skinAvatarUrl"
        :alt="userStore.account.minecraftUsername"
        class="h-9 w-9 rounded-lg border border-white/10 bg-nexus-bg object-cover"
      />
      <span
        class="max-w-[60px] truncate text-[9px] font-medium text-white/50"
        :title="userStore.displayName"
      >
        {{ userStore.account.characterName.split(" ")[0] }}
      </span>
    </div>

    <!-- Déconnexion -->
    <button
      type="button"
      class="mt-4 flex h-10 w-10 items-center justify-center rounded-xl text-white/30 transition-colors hover:bg-red-500/10 hover:text-red-400"
      title="Déconnexion"
      @click="handleLogout"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </button>
  </aside>
</template>
