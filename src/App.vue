<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppLayout from "@/components/layout/AppLayout.vue";

const route = useRoute();

const useLayout = computed(() => route.meta.layout !== "none");
</script>

<template>
  <div class="h-full bg-nexus-bg p-3">
    <AppLayout v-if="useLayout">
      <RouterView v-slot="{ Component }">
        <Transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </AppLayout>

    <RouterView v-else v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>
