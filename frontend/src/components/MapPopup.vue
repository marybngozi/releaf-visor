<template>
  <div class="selectedMill">
    <h4 class="text-xl font-mulish font-bold flex items-center gap-2">
      <span
        class="block h-2 w-2 rounded-full"
        :style="{
          backgroundColor: getLastTransactionColor(
            selectedMill.lastTransactionDate
          ),
        }"
      ></span>

      <span class="text-primary uppercase">{{ selectedMill.millName }}</span>
    </h4>

    <p class="mt-2">
      <b>Palm Kernel sold:</b>
      <span> {{ selectedMill.p1Amount.toFixed(2) }} tons </span>
    </p>

    <p>
      <b>Number of Transactions:</b>
      <span>
        {{ selectedMill.numTransactions }}
      </span>
    </p>

    <p>
      <b>Average price:</b>
      <span> ₦{{ formatMoney(selectedMill.p1PriceTon) }}/ton </span>
    </p>

    <p>
      <b>Last Transaction on:</b>
      <span>
        {{
          selectedMill.lastTransactionDate
            ? new Date(selectedMill.lastTransactionDate)
                .toISOString()
                .split("T")[0]
            : "N/A"
        }}
      </span>
    </p>

    <p>
      <b>Status:</b>
      <em
        :class="`font-semibold ${
          selectedMill.status && selectedMill.status === 'active'
            ? 'text-secondary'
            : 'text-red-400'
        }`"
      >
        {{ selectedMill?.status || "Inactive" }}
      </em>
    </p>

    <p class="text-right">
      <button
        class="text-primary underline"
        @click="$emit('openEditForm', true)"
      >
        Edit Data
      </button>
    </p>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "MapPopup",

  props: {
    getLastTransactionColor: {
      type: Function,
    },
    selectedMill: {
      type: Object,
      default: () => ({
        millName: "RTM003",
        latitude: 5.0,
        longitude: 8.0,
        p1Amount: 0.0,
        numTransactions: 0,
        p1PriceTon: 0,
        status: "active",
        lastTransactionDate: "2023-10-22",
        id: "6736a8dcdbc0d30c42d5d1e@",
      }),
    },
  },

  methods: {
    formatMoney(val) {
      return val.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },
};
</script>

<style scoped>
p {
  @apply mt-1;
}

p span {
  @apply text-primary font-mulish font-bold;
}
</style>
