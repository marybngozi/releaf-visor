<template>
  <div>
    <PageHeader />

    <main>
      <GmapMap
        :center="{ lat: 5.587366, lng: 8.133794 }"
        :zoom="9"
        style="width: 100%; height: 89vh"
        map-type-id="terrain"
      >
        <GmapMarker
          v-for="mill in markers"
          :key="mill.millName"
          :position="{ lat: mill.latitude, lng: mill.longitude }"
          :title="mill.millName"
          @click="selectedMill = mill"
        />
        <GmapInfoWindow
          :opened="selectedMill !== null"
          :position="{
            lat: selectedMill?.latitude,
            lng: selectedMill?.longitude,
          }"
          @closeclick="selectedMill = null"
        >
          <div class="selectedMill" v-if="selectedMill">
            <h4 class="text-xl font-mulish font-bold flex items-center gap-2">
              <span
                class="block h-2 w-2 rounded-full"
                :style="{
                  backgroundColor: getLastTransactionColor(
                    selectedMill.lastTransactionDate
                  ),
                }"
              ></span>

              <span class="text-primary">{{ selectedMill.millName }}</span>
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
                {{ selectedMill.lastTransactionDate || "N/A" }}
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
                @click="editData(selectedMill)"
              >
                Edit Data
              </button>
            </p>
          </div>
        </GmapInfoWindow>
      </GmapMap>

      <div class="absolute bottom-4 left-4">
        <button
          class="bg-primary text-white px-4 py-2 rounded"
          @click="showAddForm = true"
        >
          Add New PKS Dumpsite
        </button>
      </div>

      <AddNewMarker
        v-if="showAddForm"
        class=""
        @close="showAddForm = false"
        @added="updateMarkers"
        :isEdit="isEdit"
      />
    </main>
  </div>
</template>

<style scoped>
main {
  @apply p-2 relative;
}

p {
  @apply mt-1;
}

p span {
  @apply text-primary font-mulish font-bold;
}
</style>

<script>
/* eslint-disable */
import PageHeader from "@/components/PageHeader.vue";
import AddNewMarker from "@/components/AddNewMarker.vue";

export default {
  name: "MapViewer",

  components: {
    PageHeader,
    AddNewMarker,
  },

  data() {
    return {
      showAddForm: false,
      isEdit: false,
      markers: [
        {
          millName: "RTM001",
          latitude: 5.546921,
          longitude: 8.198576,
          p1Amount: 314.56,
          numTransactions: 11,
          p1PriceTon: 53400,
          lastTransactionDate: null,
        },
        {
          millName: "RTM008",
          latitude: 5.609851,
          longitude: 8.183427,
          p1Amount: 625.89,
          numTransactions: 19,
          p1PriceTon: 51100,
          lastTransactionDate: "2023-10-14",
        },
      ],
      selectedMill: null,
    };
  },

  methods: {
    formatMoney(val) {
      return val.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    getLastTransactionColor(date) {
      if (!date) return "gray";
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      const transactionDate = new Date(date);

      if (transactionDate > oneWeekAgo) {
        return "green";
      } else if (transactionDate > twoWeeksAgo) {
        return "orange";
      } else {
        return "red";
      }
    },

    updateMarkers(newMarker) {
      this.markers.push(newMarker);
      this.showAddForm = false;
    },

    editData(data) {
      console.log(data);
      this.isEdit = true;
      this.showAddForm = true;
    },
  },
};
</script>
