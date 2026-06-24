<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

const router = useRouter();
const userStore = useUserStore();

async function handleLogin(): Promise<void> {
  await userStore.loginWithMicrosoft();
  await router.push({ name: "home" });
}
</script>

<template>
  <div
    class="relative flex h-full items-center justify-center overflow-hidden bg-nexus-bg"
  >
    <!-- Arrière-plan décoratif -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-nexus-accent/20 blur-[120px]"
      />
      <div
        class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-nexus-neon/10 blur-[120px]"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08080d_70%)]"
      />
    </div>

    <Transition name="fade" mode="out-in">
      <!-- État chargement -->
      <div
        v-if="userStore.isLoggingIn"
        key="loading"
        class="relative z-10 flex flex-col items-center gap-6"
      >
        <LoadingSpinner size="lg" />
        <p class="text-sm text-white/50">Connexion à Microsoft en cours…</p>
      </div>

      <!-- État accueil -->
      <div
        v-else
        key="login"
        class="relative z-10 flex w-full max-w-md flex-col items-center px-8"
      >
        <!-- Logo -->
        <div
          class="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-nexus-accent to-nexus-neon shadow-2xl shadow-nexus-accent/40"
        >
          <span class="text-4xl font-black text-white">N</span>
        </div>

        <h1 class="text-3xl font-black tracking-tight text-white">NexusRP</h1>
        <p class="mt-2 text-center text-sm text-white/40">
          Launcher officiel du serveur RolePlay
        </p>

        <div class="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <!-- Bouton Microsoft -->
        <button
          type="button"
          class="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-nexus-accent/10 active:scale-[0.98]"
          @click="handleLogin"
        >
          <!-- Logo Microsoft -->
          <svg class="h-5 w-5" viewBox="0 0 21 21" fill="none">
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
          </svg>
          Se connecter avec Microsoft
        </button>

        <p class="mt-6 text-center text-xs leading-relaxed text-white/25">
          Mode démo : un compte fictif sera chargé pour prévisualiser l'interface.
        </p>
      </div>
    </Transition>
  </div>
</template>
