<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen">
    <img
      class="mx-auto"
      src="@/assets/images/notfound.svg"
      alt="loading icon"
      width="168"
      height="170"
    />
    <p class="text-center fw-bold">Page Not Found!</p>

    <router-link
      :to="{ name: 'dashboard' }"
      class="text-purple-700 underline mt-4"
      >Back to sanity</router-link
    >
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>
<style scoped></style>
