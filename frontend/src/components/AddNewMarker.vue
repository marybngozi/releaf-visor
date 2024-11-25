<template>
  <section>
    <div class="relative w-full h-full z-10 px-4 py-7 bg-white shadow-md">
      <button
        class="py-2 px-3 absolute top-0 left-0 h-10 w-10 text-2xl"
        @click="closeForm"
      >
        &#10005;
      </button>

      <form
        class="mt-3 overflow-y-scroll h-full pb-5 font-mulish"
        @submit.prevent="addEditLocation"
      >
        <div class="sticky top-0 bg-white pb-2">
          <h1 class="text-2xl font-bold text-primary text-center">
            <span>{{ isEdit ? "Edit" : "Add" }}</span> Palm Kernel Dumpsite
          </h1>
        </div>

        <div class="mt-7 mb-5">
          <h2
            class="bg-green-50 px-4 py-2 rounded text-sm font-bold text-gray-500"
          >
            Use the search to get your desired location
          </h2>

          <label
            class="mt-2 flex w-full border border-secondary pl-4 gap-3 h-12 rounded"
          >
            <GmapAutocomplete
              @place_changed="initMarker"
              class="w-full outline-none"
              autofocus
            ></GmapAutocomplete>

            <div
              class="border px-4 bg-primary rounded-r flex justify-center items-center"
            >
              <img src="@/assets/images/map_add.svg" alt="icons" />
            </div>
          </label>
        </div>

        <div class="form-group">
          <label for="millName">
            <span class="req">*</span>
            Name of the Mill
          </label>
          <input
            type="text"
            id="millName"
            v-model="form.millName"
            required
            minlength="3"
            maxlength="20"
            :readonly="isEdit"
          />
        </div>

        <div class="form-group">
          <label for="p1Amount">
            <span class="req">*</span>
            Palm Kernel Capacity (tons)
          </label>
          <input
            type="number"
            min="1"
            max="999999999"
            id="p1Amount"
            v-model="form.p1Amount"
            required
          />
        </div>

        <div class="form-group">
          <label for="status">
            <span class="req">*</span>
            Location status
          </label>
          <select id="status" v-model="form.status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div class="form-group" v-if="form.latitude">
          <label for="latitude">
            <span class="req">*</span>
            Latitude
          </label>
          <input
            type="text"
            pattern="^-?\d+(\.\d+)?$"
            onkeypress="return isNumber(event)"
            v-model="form.latitude"
            id="latitude"
            minlength="6"
            maxlength="8"
          />
        </div>

        <div class="form-group" v-if="form.longitude">
          <label for="longitude">
            <span class="req">*</span>
            Longitude
          </label>
          <input
            type="text"
            pattern="^-?\d+(\.\d+)?$"
            onkeypress="return isNumber(event)"
            v-model="form.longitude"
            id="longitude"
            minlength="6"
            maxlength="8"
          />
        </div>

        <div class="form-group">
          <label for="lastTransactionDate"> Last Transaction Date </label>
          <input
            type="date"
            id="lastTransactionDate"
            v-model="form.lastTransactionDate"
            :max="new Date().toISOString().split('T')[0]"
          />
        </div>

        <div class="mt-3 text-red-400 text-sm font-semibold">
          {{ errorMessage }}
        </div>

        <div class="mt-8">
          <p class="text-sm text-secondary mb-2">
            <span class="req">*</span> Required
          </p>

          <button
            @click="addEditLocation"
            type="submit"
            :disabled="!formReady || loading"
            class="w-full bg-primary text-white py-3 rounded flex gap-2 justify-center items-center"
          >
            <span v-if="isEdit">Update Site Info</span>

            <span v-else>Add New Site</span>
            <spinner v-if="loading"></spinner>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: "AddNewMarker",

  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: () => ({
        millName: "RTM003",
        latitude: 5.0,
        longitude: 8.0,
        p1Amount: 0.0,
        numTransactions: 0,
        p1PriceTon: 0,
        lastTransactionDate: "2023-10-22",
        id: "6736a8dcdbc0d30c42d5d1e@",
      }),
    },
    latitude: Number,
    longitude: Number,
  },

  created() {
    if (this.isEdit) {
      this.form = { ...this.editData };
    } else {
      this.form.latitude = this.latitude.toFixed(6);
      this.form.longitude = this.longitude.toFixed(6);
    }
  },

  data() {
    return {
      existingPlace: null,
      loading: false,
      errorMessage: null,
      form: {
        millName: "",
        p1Amount: "",
        status: "active",
        latitude: null,
        longitude: null,
        numTransactions: 0,
        p1PriceTon: 0,
        lastTransactionDate: null,
      },
    };
  },

  computed: {
    formReady() {
      return (
        this.form.millName &&
        this.form.p1Amount &&
        this.form.latitude &&
        this.form.longitude
      );
    },
  },

  methods: {
    clearForm() {
      this.form = {
        millName: "",
        p1Amount: "",
        status: "active",
        latitude: null,
        longitude: null,
        numTransactions: 0,
        p1PriceTon: 0,
        lastTransactionDate: null,
      };
    },
    closeForm() {
      this.clearForm();
      this.$emit("close");
    },
    initMarker(loc) {
      if (!loc) {
        this.form.latitude = null;
        this.form.longitude = null;
        return;
      }

      this.form.latitude = loc.geometry.location.lat().toFixed(6);
      this.form.longitude = loc.geometry.location.lng().toFixed(6);
    },

    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    },

    async addEditLocation() {
      try {
        if (!this.formReady) {
          return;
        }
        this.errorMessage = null;

        this.loading = true;

        const res = await this.$http.post("/mill", this.form);

        this.loading = false;

        if (this.isEdit) {
          this.$emit("edited", {
            ...this.form,
            latitude: Number(this.form.latitude),
            longitude: Number(this.form.longitude),
          });
        } else {
          this.$emit("added", {
            ...this.form,
            latitude: Number(this.form.latitude),
            longitude: Number(this.form.longitude),
          });
        }

        this.clearForm();
      } catch (error) {
        this.loading = false;
        console.log(error);
        if (error.code == "ERR_BAD_REQUEST") {
          // if it is an array, take the first index
          if (Array.isArray(error.response.data.message)) {
            this.errorMessage = error.response.data.message[0];
            return;
          }
          this.errorMessage = error.response.data.message;
        }
      }
    },
  },
};
</script>

<style scoped>
section {
  @apply absolute top-1 bottom-1 right-1;
  width: 90%;
  max-width: 448px;
  z-index: 100;
}

form {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.req {
  @apply text-red-600;
}
input:read-only {
  @apply bg-gray-100;
}
</style>
