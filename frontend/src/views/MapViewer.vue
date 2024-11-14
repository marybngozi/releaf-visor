<template>
  <main>
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <AddMarker msg="Welcome to Your Vue.js + TypeScript App" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddMarker from "@/components/AddMarker.vue";

export default defineComponent({
  name: "MapViewer",
  components: {
    AddMarker,
  },
});
</script>
