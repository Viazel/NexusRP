<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const size = computed(() => (route.meta.spinnerSize as string) ?? "md");

const sizeClasses: Record<string, string> = {
  sm: "h-5 w-5 border-2",
  md: "h-10 w-10 border-[3px]",
  lg: "h-14 w-14 border-4",
};
</script>

<template>
  <div
    class="animate-spin rounded-full border-nexus-accent/20 border-t-nexus-neon"
    :class="sizeClasses[size]"
    role="status"
    aria-label="Chargement"
  />
</template>
