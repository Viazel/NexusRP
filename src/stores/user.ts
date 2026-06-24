import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { MOCK_ACCOUNT } from "@/data/mockAccount";
import type { UserAccount } from "@/types";

export const useUserStore = defineStore("user", () => {
  const isAuthenticated = ref(false);
  const isLoggingIn = ref(false);
  const isLaunching = ref(false);
  const launchProgress = ref(0);
  const account = ref<UserAccount | null>(null);

  const profile = computed(() => account.value);

  const displayName = computed(
    () => account.value?.characterName ?? "",
  );

  const formattedBalance = computed(() =>
    account.value
      ? new Intl.NumberFormat("fr-FR").format(account.value.bankBalance)
      : "0",
  );

  const skinAvatarUrl = computed(() =>
    account.value
      ? `https://minotar.net/avatar/${account.value.minecraftUsername}/64`
      : "",
  );

  /** Simule la connexion Microsoft et charge le compte fictif */
  async function loginWithMicrosoft(): Promise<void> {
    isLoggingIn.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1800));
    account.value = { ...MOCK_ACCOUNT };
    isAuthenticated.value = true;
    isLoggingIn.value = false;
  }

  function logout(): void {
    isAuthenticated.value = false;
    account.value = null;
    launchProgress.value = 0;
    isLaunching.value = false;
  }

  /** Simule le téléchargement de mods et le lancement du jeu */
  async function launchGame(): Promise<void> {
    if (isLaunching.value) return;
    isLaunching.value = true;
    launchProgress.value = 0;

    const steps = [12, 28, 45, 62, 78, 91, 100];
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 300));
      launchProgress.value = step;
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
    isLaunching.value = false;
    launchProgress.value = 0;
  }

  return {
    isAuthenticated,
    isLoggingIn,
    isLaunching,
    launchProgress,
    account,
    profile,
    displayName,
    formattedBalance,
    skinAvatarUrl,
    loginWithMicrosoft,
    logout,
    launchGame,
  };
});
