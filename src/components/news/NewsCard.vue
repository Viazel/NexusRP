<script setup lang="ts">
import type { NewsArticle } from "@/types";

defineProps<{
  article: NewsArticle;
}>();

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}
</script>

<template>
  <article
    class="group cursor-pointer overflow-hidden rounded-2xl border border-white/6 bg-nexus-surface/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-nexus-accent/30 hover:shadow-xl hover:shadow-nexus-accent/10"
  >
    <div class="relative h-40 overflow-hidden">
      <img
        :src="article.imageUrl"
        :alt="article.title"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-nexus-surface via-transparent to-transparent"
      />
      <span
        class="absolute left-3 top-3 rounded-full bg-nexus-accent/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm"
      >
        {{ article.category }}
      </span>
    </div>

    <div class="p-4">
      <time class="text-xs text-white/40">{{ formatDate(article.date) }}</time>
      <h3 class="mt-1 text-base font-bold text-white group-hover:text-nexus-neon transition-colors">
        {{ article.title }}
      </h3>
      <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-white/50">
        {{ article.summary }}
      </p>
    </div>
  </article>
</template>
