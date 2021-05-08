<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant="mini && $vuetify.breakpoint.mdAndUp"
      mini-variant-width="64"
      :permanent="$vuetify.breakpoint.mdAndUp"
      color="secondary"
      class="app-nav-drawer white--text"
      dark
    >
      <!-- <v-list> -->
        <v-list-item v-if="mini" class="py-2">
          <v-app-bar-nav-icon @click.stop="mini = !mini">
            <v-icon size="16">fa fa fa fa-bars</v-icon>
          </v-app-bar-nav-icon>
        </v-list-item>
        <v-list-item v-if="!mini" class="py-2">
          <v-list-item-content class="py-0">
            <div class="text-center">
              
            </div>
          </v-list-item-content>
        </v-list-item>
      <!-- </v-list> -->

      <v-divider></v-divider>

      <!-- MenuList handles nested menus -->
      <MenuList :mini="mini" />

      <template v-slot:append>
        <!-- Log Out -->
        <v-list-item link @click="handleLogOut">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-left ml-3">Log Out</v-list-item-title>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon
        v-if="!mini || $vuetify.breakpoint.smAndDown"
        @click.stop="toggleDrawer"
      >
        <v-icon size="16">fa fa fa fa-bars</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title><b>Movie Box</b></v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <div class="pr-2">
          <div>Username</div>
          <div>Role</div>
        </div>
        <v-icon>mdi-chevron-down</v-icon>
      </div>
    </v-app-bar>
    <!-- Bottom of App Bar -- Breadcrumbs -->
    <BreadcrumbsBar />

    <!-- Sizes your content based upon application components -->
    <v-main class="mt-16">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import MenuList from './components/MenuList'
import BreadcrumbsBar from './components/BreadcrumbsBar'

export default {
  components: {
    MenuList,
    BreadcrumbsBar
  },
  name: 'Dashboard',
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      hasToken: 'auth/hasToken'
    }),
  },
  data: () => ({
    drawer: false,
    mini: false,
  }),
  async mounted() {
    //console.log(this.$route)
    await this.getUserData()
  },
  methods: {
    ...mapActions({
      logOut: 'auth/logOut',
      getUserData: 'auth/getUserData'
    }),
    toggleDrawer() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.mini = !this.mini
        return
      }
      this.drawer = !this.drawer
    },
    isRouteActive(link) {
      return link == this.$route.path
    },
    navDrawerHover() {
      console.log('is hovering nav drawer')
    },
    handleLogOut() {
      this.logOut()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';
</style>

