<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const skinUrl = computed(
  () =>
    userStore.profile
      ? `https://minotar.net/avatar/${userStore.profile.minecraftUsername}/128`
      : "",
);

const skinBodyUrl = computed(
  () =>
    userStore.profile
      ? `https://minotar.net/body/${userStore.profile.minecraftUsername}/200`
      : "",
);
</script>

<template>
  <div v-if="userStore.profile" class="flex h-full flex-col overflow-hidden">
    <header class="shrink-0 border-b border-white/6 px-8 py-6">
      <h1 class="text-2xl font-bold text-white">Profil RP</h1>
      <p class="mt-1 text-sm text-white/40">
        Connecté en tant que
        <span class="text-white/60">{{ userStore.account?.microsoftEmail }}</span>
      </p>
    </header>

    <div class="flex flex-1 items-center justify-center overflow-y-auto p-8">
      <div
        class="flex w-full max-w-2xl flex-col items-center gap-8 rounded-2xl border border-white/8 bg-nexus-surface/50 p-8 backdrop-blur-sm sm:flex-row sm:items-start"
      >
        <!-- Skin Minecraft -->
        <div class="relative shrink-0">
          <div
            class="absolute -inset-3 rounded-2xl bg-gradient-to-br from-nexus-accent/30 to-nexus-neon/20 blur-xl"
          />
          <div
            class="relative overflow-hidden rounded-2xl border border-white/10 bg-nexus-bg/80 p-4"
          >
            <img
              :src="skinBodyUrl"
              :alt="`Skin de ${userStore.profile.minecraftUsername}`"
              class="h-48 w-auto object-contain"
            />
          </div>
          <img
            :src="skinUrl"
            :alt="`Tête de ${userStore.profile.minecraftUsername}`"
            class="absolute -bottom-3 -right-3 h-14 w-14 rounded-xl border-2 border-nexus-accent bg-nexus-bg object-cover shadow-lg"
          />
        </div>

        <!-- Informations RP -->
        <div class="flex-1 text-center sm:text-left">
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-nexus-neon/70">
            Personnage
          </p>
          <h2 class="mt-1 text-3xl font-black text-white">
            {{ userStore.profile.characterName }}
          </h2>
          <p class="mt-1 text-sm text-white/40">
            @{{ userStore.profile.minecraftUsername }}
          </p>

          <div class="mt-8 space-y-4">
            <div class="rounded-xl border border-white/6 bg-white/3 px-5 py-4">
              <p class="text-xs uppercase tracking-wider text-white/35">Métier</p>
              <p class="mt-1 text-lg font-semibold text-white">
                {{ userStore.profile.job }}
              </p>
            </div>

            <div class="rounded-xl border border-white/6 bg-white/3 px-5 py-4">
              <p class="text-xs uppercase tracking-wider text-white/35">Grade</p>
              <p class="mt-1 text-lg font-semibold text-nexus-gold">
                {{ userStore.profile.grade }}
              </p>
            </div>

            <div
              class="rounded-xl border border-nexus-accent/20 bg-nexus-accent/5 px-5 py-4"
            >
              <p class="text-xs uppercase tracking-wider text-white/35">
                Solde en banque
              </p>
              <p class="mt-1 text-2xl font-black text-nexus-neon">
                {{ userStore.formattedBalance }}
                <span class="text-sm font-medium text-white/40">NexusCoins</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
