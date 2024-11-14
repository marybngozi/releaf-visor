<template>
  <div class="holder w-full">
    <PageHeader />

    <main>
      <section id="left">
        <h1>See the World in a new light with Releaf Visor.</h1>
      </section>

      <section id="right">
        <form @submit.prevent="login" class="px-4 w-full md:px-20 lg:w-2/3">
          <h1 class="text-lg font-bold text-primary text-center">Login</h1>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              required
            />
          </div>

          <div class="form-group">
            <button
              @click="login"
              type="submit"
              class="bg-primary w-full text-white px-4 py-2.5 rounded mt-7"
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: "Login",

  components: {
    PageHeader,
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  computed: {
    formReady() {
      return this.form.email && this.form.password;
    },
  },

  methods: {
    async login() {
      try {
        if (!this.formReady) {
          return;
        }

        // TODO: call backend
        console.log(this.form);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
#left {
  @apply w-full lg:w-1/2 h-60 flex flex-col justify-center lg:h-screen  text-white font-mulish pl-8 pr-4;
  position: relative;
  background-image: url("../assets/images/palmss.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* height: 100vh; */
}

#right {
  @apply w-full lg:w-1/2 flex justify-center mt-9;
}

main {
  @apply flex flex-col items-stretch lg:flex-row;
  height: 80vh;
}

main h1 {
  @apply text-4xl font-bold font-mulish mt-4 max-w-2xl md:text-3xl lg:text-7xl lg:max-w-3xl lg:mt-40;
}
</style>
