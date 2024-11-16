<script>
/* eslint-disable */
export default {
  name: "PageHeader",

  methods: {
    logout() {
      this.$router.push({ name: "Login" });
      setTimeout(() => {
        this.$store.commit("logout");
      }, 200);
    },
  },
};
</script>

<template>
  <header
    class="bg-white px-4 py-3 font-mulish flex justify-between items-center lg:pr-10 shadow-md"
  >
    <div class="flex gap-1 items-center">
      <router-link :to="{ name: 'Home' }" class="flex gap-1 items-center">
        <img
          alt="Visor logo"
          src="@/assets/images/logo.png"
          class="h-9 md:h-11 lg:h-12"
        />
        <h1 class="text-primary font-bold text-xl lg:text-2xl mt-1 lg:mt-2">
          Releaf Insight
        </h1>
      </router-link>
    </div>

    <nav class="">
      <ul class="flex lg:gap-2">
        <li>
          <router-link :to="{ name: 'Map Viewer' }" class="">
            Map Viewer
          </router-link>
        </li>

        <!-- <li class="text-secondary">|</li>

        <li v-if="$store.state.loggedIn">
          <a @click.prevent="logout" class="text-secondary">Logout</a>
        </li>

        <li v-else>
          <router-link :to="{ name: 'Login' }"> Login </router-link>
        </li> -->
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
li a:active {
  @apply border-b-2 border-secondary;
}
</style>
