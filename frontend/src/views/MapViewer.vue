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
          <MapPopup
            v-if="selectedMill"
            @openEditForm="openForm"
            :getLastTransactionColor="getLastTransactionColor"
            :selectedMill="selectedMill"
          />
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
import MapPopup from "@/components/MapPopup.vue";
import AddNewMarker from "@/components/AddNewMarker.vue";

export default {
  name: "MapViewer",

  components: {
    PageHeader,
    MapPopup,
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
      if (!date) return "secondary";
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
