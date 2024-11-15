<template>
  <section class="absolute top-1 bottom-1 right-1 w-[90%] max-w-md">
    <div class="relative w-full h-full z-10 px-4 py-7 bg-white shadow-md">
      <button
        class="py-2 px-3 absolute top-0 left-0 h-10 w-10 text-2xl"
        @click="closeForm"
      >
        &#10005;
      </button>

      <form
        class="mt-3 overflow-y-scroll h-[60vh]"
        @submit.prevent="addEditLocation"
      >
        <h1 class="text-2xl font-bold text-primary text-center">
          <span>{{ isEdit ? "Edit" : "Add" }}</span> Palm Kernel Dumpsite
        </h1>

        <div class="mt-9 mb-5">
          <h2
            class="bg-green-50 px-4 py-2 rounded text-sm font-bold text-gray-500"
          >
            Use the search to get your desired location
          </h2>

          <label class="mt-2 flex w-full border pl-4 gap-3 h-12 rounded">
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
          <label for="millName">Name of the Mill</label>
          <input
            type="text"
            id="millName"
            v-model="form.millName"
            required
            minlength="3"
            maxlength="20"
          />
        </div>

        <div class="form-group">
          <label for="p1Amount">Palm Kernel Capacity (tons)</label>
          <input
            type="number"
            min="0"
            max="999999999"
            id="p1Amount"
            v-model="form.p1Amount"
            required
          />
        </div>

        <div class="form-group">
          <label for="status">Location status</label>
          <select id="status" v-model="form.status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div class="form-group" v-if="form.latitude">
          <label for="latitude">Latitude</label>
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
          <label for="longitude">longitude</label>
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

        <button
          @click="addEditLocation"
          type="submit"
          :disabled="!formReady"
          class="w-full bg-primary text-white py-3 rounded mt-14"
        >
          <span v-if="isEdit">Update Site Info</span>

          <span v-else>Add New Site</span>
        </button>
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
  },

  created() {
    if (this.isEdit) {
      this.form = { ...this.editData };
    }
  },

  data() {
    return {
      existingPlace: null,
      loading: false,
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

        this.loading = true;

        const res = await this.$http.post("/mill", this.form);

        console.log(res);

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
        console.log(error);
      }
    },
  },
};
</script>
