<template>
  <div>
    <v-tabs :value="$route.path">
      <router-link to="/master-data/movies-list/action" v-slot="{ href }">
        <v-tab :href="href">ACTION</v-tab>
      </router-link>
      <router-link to="/master-data/movies-list/comedy" v-slot="{ href }">
        <v-tab :href="href">COMEDY</v-tab>
      </router-link>
      <router-link to="/master-data/movies-list/drama" v-slot="{ href }">
        <v-tab :href="href">DRAMA</v-tab>
      </router-link>
      <router-link to="/master-data/movies-list/fantasy" v-slot="{ href }">
        <v-tab :href="href">FANTASY</v-tab>
      </router-link>
      <router-link to="/master-data/movies-list/horror" v-slot="{ href }">
        <v-tab :href="href">HORROR</v-tab>
      </router-link>
      <router-link to="/master-data/movies-list/sci-fi" v-slot="{ href }">
        <v-tab :href="href">SCI-FI</v-tab>
      </router-link>
      <router-link to="/master-data/movies-list/thriller" v-slot="{ href }">
        <v-tab :href="href">THRILLER</v-tab>
      </router-link>
    </v-tabs>

    <v-card>
      <v-card-text>
        <DataTable
          :headers="headers"
          :items="items"
          :items-length="count"
          :items-per-page="itemsPerPage"
          :search="search"
          :sort-by="['tanggal']"
          :sort-desc="[true]"
          :loading="isLoading"
          :page="page"
          @pageChange="onPageChange"
        ></DataTable>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import DataTable from "@/components/datatable";
import { getMovies } from "@/api/movies-list";
export default {
  name: "MoviesList",
  components: {
    DataTable,
  },
  data: () => ({
    headers: [
      {
        text: "No",
        value: "No",
      },
      {
        text: "Title",
        value: "Title",
      },
      {
        text: "Release Date",
        value: "ReleaseDate",
      },
      {
        text: "Production House",
        value: "ProductionHouse",
      },
      {
        text: "Director",
        value: "Director",
      },
      {
        text: "Writer",
        value: "Writer",
      },
      {
        text: "Country",
        value: "Country",
      },
      {
        text: "Language",
        value: "Language",
      },
      {
        text: "Budget",
        value: "Budget",
      },
      {
        text: "Box Office",
        value: "BoxOffice",
      },
    ],
    items: [],
    itemsPerPage: 200,
    count: 0,
    page: 1,
    search: "",
    isLoading: false,
  }),
  computed: {
    movieGenre() {
      const defaultTab = "action";
      return this.$route.params.tab ? this.$route.params.tab : defaultTab;
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      await this.fetchMovies();
      this.isLoading = false;
    } catch (err) {
      console.log(err);
      this.isLoading = false;
    }
  },
  methods: {
    async fetchMovies() {
      const genre = this.movieGenre;
      const resp = await getMovies({ genre });
      const { movies, total_data } = resp.data;
      this.items = movies;
      this.count = total_data;

      this.items = movies.map((d, idx) => ({
        ...d,
        No: this.itemsPerPage * (this.page - 1) + idx + 1,
      }));
    },
  },
};
</script>
<style lang="scss"></style>
