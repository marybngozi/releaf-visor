<template>
  <div>
    <PageHeader />

    <div class="loader w-full flex items-center justify-center" v-if="loading">
      <div>
        <spinner color="primary" class="h-20 w-20 opacity-40"></spinner>
        <p><em>...fetching map</em></p>
      </div>
    </div>

    <main v-else>
      <GmapMap
        :center="{ lat: 5.587366, lng: 8.133794 }"
        :zoom="12"
        style="width: 100%; height: 89vh"
      >
        <!-- map-type-id="terrain" -->
        <GmapMarker
          v-for="mill in markers"
          :key="mill.millName"
          :position="{ lat: mill.latitude, lng: mill.longitude }"
          :title="mill.millName"
          :icon="getMarkerIcon(mill)"
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
              <button class="text-primary underline" @click="openForm(true)">
                Edit Data
              </button>
            </p>
          </div>
        </GmapInfoWindow>
      </GmapMap>

      <div class="absolute bottom-4 left-4">
        <button
          class="bg-primary text-white px-4 py-2 rounded"
          @click="openForm(false)"
        >
          Add New PKS Dumpsite
        </button>
      </div>

      <AddNewMarker
        v-if="showAddForm"
        class=""
        @close="showAddForm = false"
        @added="addMarkers"
        @edited="updateMarkers"
        :isEdit="isEdit"
        :editData="selectedMill"
      />
    </main>
  </div>
</template>

<style scoped>
main {
  @apply p-2 relative;
}

.loader {
  height: 80vh;
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
      loading: true,
      showAddForm: false,
      isEdit: false,
      markers: [],
      selectedMill: null,
    };
  },

  async created() {
    await this.getData();
  },

  methods: {
    getMarkerIcon(mill) {
      if (!mill.lastTransactionDate) {
        return "https://biopay.s3.eu-west-2.amazonaws.com/email-templates/pin.png";
      } else {
        return `https://biopay.s3.eu-west-2.amazonaws.com/email-templates/pin-${this.getLastTransactionColor(
          mill.lastTransactionDate
        )}.png`;
      }
    },

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
        return "yellow";
      } else {
        return "red";
      }
    },

    openForm(val) {
      this.showAddForm = false;
      this.isEdit = val;
      setTimeout(() => {
        this.showAddForm = true;
      }, 200);
    },
    async addMarkers(newMarker) {
      // this.markers.push(newMarker);
      this.showAddForm = false;

      await this.getData();
    },

    updateMarkers(newMarker) {
      const existingMarker = this.markers.find(
        (marker) => marker.id === newMarker.id
      );

      if (existingMarker) {
        // Update properties directly using pass-by-reference
        Object.assign(existingMarker, newMarker);
      }

      this.showAddForm = false;
    },

    async getData() {
      try {
        this.loading = true;

        const res = await this.$http.get("/mill?pageSize=100");

        this.markers = res.data;

        this.loading = false;

        console.log(res);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  },
};
</script>
