<template>
  <div class="data-table-wrapper">
    <div
      class="d-flex justify-space-between align-center"
      v-if="!hideNumEntries"
      style="height: 32px;"
    >
      <div class="pagination-info">
        Showing {{ from }} to {{ to }} of {{ total }} entries
      </div>
      <div class="d-flex align-center my-2" style="height: 40px">
        <slot name="searching-icon"></slot>
      </div>
    </div>
    <div
      class="d-flex justify-space-between"
      style="padding: 0px 12px 0px 12px"
    >
      <v-row>
        <v-col cols="10" style="padding: 12px 0px 0px 0px">
          <slot name="buttons"></slot>
        </v-col>
        <v-col cols="2" style="padding: 12px 12px 0px 12px">
          <slot name="searching-area"></slot>
        </v-col>
      </v-row>
    </div>
    <div class="d-flex justify-space-between">
      <v-row>
        <v-col cols="12">
          <slot name="table-title"></slot>
        </v-col>
      </v-row>
    </div>
    <!-- Data Table -->
    <v-data-table
      :headers="_headers"
      :items="items"
      :search="filterSearch"
      :items-per-page="itemsPerPage"
      class="data-table"
      :class="additionalClass"
      hide-default-footer
      :custom-filter="customFilter ? customFilter : defaultFilter"
      :loading="loading"
      :loading-text="computedLoadingText"
      :height="height"
      :fixed-header="fixedHeader"
      :server-items-length="serverItemsLength"
      @update:options="onServerSideUpdate"
    >
      <!-- Slots for row formatting -->
      <template v-for="(slot, name) in $scopedSlots" v-slot:[name]="item">
        <slot :name="name" v-bind="item"></slot>
      </template>

      <!-- Custom Footer -->
      <template v-slot:footer v-if="!hideFooter">
        <div class="footer d-flex justify-space-between align-center flex-wrap">
          <v-spacer></v-spacer>
          <v-pagination
            v-model="_page"
            :length="pageCount"
            :total-visible="10"
            color="highlight"
          ></v-pagination>
          <div class="d-flex align-center">
            <div>Goto</div>
            <div style="width: 50px; margin-left: 8px">
              <v-text-field
                outlined
                dense
                type="number"
                style="height=24px;"
                hide-details="true"
                @keyup.enter="onGoToPage"
              ></v-text-field>
            </div>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    headers: Array,
    items: Array,
    additionalClass: String,
    customFilter: Function,
    sortBy: Array,
    sortDesc: Array,
    loading: Boolean,
    loadingText: String,
    hideNumEntries: Boolean,
    hideFooter: Boolean,
    height: String,
    fixedHeader: Boolean,
    // Manually set the total items count if needed
    itemsLength: Number,
    // Setting this will disable client side sorting
    // Use this.onServerSideUpdate to sort server side
    serverItemsLength: Number,
    page: Number,
    itemsPerPage: {
      type: Number,
      default: 20,
    },
    advancedSearchFormFields: Array,
  },
  data: () => ({
    filterSearch: "",
    filterSelect: "",
  }),
  computed: {
    hasMergedHeaders() {
      for (let i = 0; i < this.headers.length; i++) {
        if ("group" in this.headers[i]) {
          return true;
        }
      }
      return false;
    },
    _headers() {
      if (this.filterSelect) {
        console.log(this.filterSelect);
        return this.headers.map((h) => ({
          ...h,
          filterable: h.value == this.filterSelect,
        }));
      }
      return this.headers;
    },
    filterItems() {
      if (!this.headers) {
        return [];
      }
      const items = this.headers
        .map((h) => ({ text: h.text, value: h.value }))
        .filter((val) => !!val);
      items.unshift({ text: "All", value: "" });

      return items;
    },
    computedLoadingText() {
      return this.loadingText ? this.loadingText : "Loading.. Please wait";
    },
    pageCount() {
      return Math.ceil(this.total / this.itemsPerPage);
    },
    _page: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("pageChange", val);
      },
    },
    /**
     * Footer Helper functions
     */
    from() {
      if (this.total == 0) {
        return 0;
      }
      return this.itemsPerPage * (this.page - 1) + 1;
    },
    to() {
      if (this.page * this.itemsPerPage > this.total) {
        return this.total;
      }
      return this.page * this.itemsPerPage;
    },
    total() {
      return this.serverItemsLength
        ? this.serverItemsLength
        : this.itemsLength
        ? this.itemsLength
        : this.items.length;
    },
    /** ----------------- */
  },
  methods: {
    log(val) {
      console.log(val);
    },
    defaultFilter(value, search /*item*/) {
      return (
        value != null &&
        search != null &&
        typeof value !== "boolean" &&
        value
          .toString()
          .toLocaleLowerCase()
          .indexOf(search.toLocaleLowerCase()) !== -1
      );
    },
    onGeneralSearch(search) {
      this.$emit("generalSearch", search);
    },
    onAdvancedSearch(searchObj) {
      this.$emit("advancedSearch", searchObj);
    },
    onFilterSearch(search) {
      this.$emit("filterSearch", search);
    },
    onFilterSelect(value) {
      this.$emit("filterSelect", value);
    },
    /**
     * Use this if you need to sort data server side
     */
    onServerSideUpdate(val) {
      val;
    },
    onGoToPage(event) {
      const page = event.target.value;
      if (page) {
        if (page > this.pageCount) {
          this._page = this.pageCount;
          return;
        }
        this._page = parseInt(page);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/variables.scss";

th,
td {
  border: 1px solid #dddddd;
}

.data-table-wrapper {
  border-radius: 8px !important;
  overflow: hidden !important;
  padding: 12px;
  box-shadow: unset !important;
  filter: drop-shadow(0px 7px 20px rgba(0, 0, 0, 0.07));
}
.data-table {
  border-radius: 8px;
  overflow: hidden;
  margin-top: 6px;

  /** text-body */
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.1px;
  /** */
  tbody tr:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  thead {
    background-color: $color-secondary !important;

    th {
      background-color: $color-secondary !important;
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      /* white-space: nowrap; */
      * {
        color: white !important;
        /** text-body */
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.1px;
        /** */
      }
      i.v-icon.notranslate.v-data-table-header__icon:not(:hover) {
        opacity: 0.5;
      }
      &.active {
        i.v-icon.notranslate.v-data-table-header__icon {
          opacity: 1;
        }
      }
    }
  }
  .footer {
    height: 72px;

    .pagination-info {
      color: $color-text-secondary;
    }
    .v-pagination {
      button {
        font-size: 11px;
        min-width: 24px;
        height: 24px;
        outline: none;
        /* outline-color: $color-secondary; */
        &:not(.v-pagination__item--active) {
          background: $color-border;
        }
      }
      li:first-child,
      li:last-child {
        button {
          width: 24px;
        }
      }
    }
    .v-text-field.v-input--dense > .v-input__control {
      height: 32px;
    }
    .v-text-field .v-input__control {
      min-height: 28px;
    }
    .v-text-field--filled > .v-input__control > .v-input__slot,
    .v-text-field--full-width > .v-input__control > .v-input__slot,
    .v-text-field--outlined > .v-input__control > .v-input__slot {
      min-height: unset;
    }

    /** To Remove arrows from text field type number **/
    /** ---- ------ ---- --- --- --- --- --- -- ---  **/
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
    /** ------- ------- ------- **/
  }
}
</style>
