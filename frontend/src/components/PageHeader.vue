<script lang="ts">
export default {
  name: "PageHeader",
  props: {
    msg: String,
  },
};
</script>

<template>
  <header
    class="bg-white px-4 py-3 font-mulish flex justify-between items-center lg:pr-10"
  >
    <div class="flex gap-1 items-center">
      <img
        alt="Visor logo"
        src="@/assets/images/logo.png"
        class="h-9 md:h-11 lg:h-12"
      />
      <h1 class="text-primary font-bold text-xl lg:text-2xl mt-1 lg:mt-2">
        Releaf Visor
      </h1>
    </div>

    <nav class="">
      <ul class="flex lg:gap-2">
        <li>
          <router-link :to="{ name: 'Map Viewer' }" class="">
            Map Viewer
          </router-link>
        </li>

        <li class="text-secondary">|</li>

        <li>
          <router-link :to="{ name: 'Login' }" class=""> Login </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
li {
  @apply mt-3;
}
li a {
  @apply text-primary text-sm md:text-base lg:text-lg font-bold border-b-2 hover:border-secondary border-transparent px-2 py-1;
}
</style>
