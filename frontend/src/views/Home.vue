<template>
  <div class="holder w-full">
    <PageHeader class="header" />

    <main class="w-full text-white font-mulish pl-8 pr-4">
      <h1
        class="text-4xl font-bold font-mulish mt-20 max-w-2xl md:text-5xl md:mt-32 lg:text-7xl lg:max-w-4xl lg:mt-40"
      >
        Revolutionizing Food Processing in Africa with Technology and Geographic
        Insights
      </h1>

      <div class="mt-10">
        <router-link
          :to="{ name: 'Map Viewer' }"
          class="font-semibold px-24 text-left py-3 text-secondary bg-white rounded"
        >
          View Map
        </router-link>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: "Home",

  components: {
    PageHeader,
  },
};
</script>

<style scoped>
.holder {
  position: relative;
  background-image: url("../assets/images/palmss.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

main {
  height: 60vh;
}

main h1 {
  @apply text-4xl font-bold font-mulish mt-20 max-w-2xl md:text-5xl md:mt-32 lg:text-7xl lg:max-w-3xl lg:mt-40;
  /* max-width: 650px; */
  /* line-height: 44px; */
}
</style>
