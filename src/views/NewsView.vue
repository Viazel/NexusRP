<script setup lang="ts">
import { mockNews } from "@/data/mockNews";
import NewsCard from "@/components/news/NewsCard.vue";
</script>

<template>
  <div class="flex h-full flex-col overflow-hidden">
    <header class="shrink-0 border-b border-white/6 px-8 py-6">
      <h1 class="text-2xl font-bold text-white">Actualités</h1>
      <p class="mt-1 text-sm text-white/40">
        Restez informé des dernières mises à jour du serveur NexusRP
      </p>
    </header>

    <div class="flex-1 overflow-y-auto p-8">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2">
        <div
          v-for="(article, index) in mockNews"
          :key="article.id"
          class="animate-[fadeUp_0.5s_ease_both]"
          :style="{ animationDelay: `${index * 80}ms` }"
        >
          <NewsCard :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
