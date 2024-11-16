<template>
  <span
    :class="`inline-block w-6 h-6 rounded-full animate-spin border-4 border-${color} border-t-transparent`"
  >
  </span>
</template>

<style scoped>
.animate-spins {
  animation: spin 1s linear infinite;
}
.border-t-transparent {
  border-top-color: transparent;
}
</style>

<script>
export default {
  name: "Spinner",

  props: {
    color: {
      type: String,
      default: "white",
    },
  },
};
</script>
