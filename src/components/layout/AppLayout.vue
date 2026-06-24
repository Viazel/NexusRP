<script setup lang="ts">
import Sidebar from "@/components/layout/Sidebar.vue";
</script>

<template>
  <div
    class="flex h-full overflow-hidden rounded-2xl border border-white/8 bg-nexus-bg/95 shadow-2xl shadow-black/60 backdrop-blur-2xl"
  >
    <Sidebar />

    <main class="relative flex flex-1 flex-col overflow-hidden">
      <slot />
    </main>
  </div>
</template>
