<template>
  <v-app-bar app dense absolute class="bottom-app-bar">
    <div class="text-h6">{{ currentRouteText }}</div>
    <v-spacer></v-spacer>
    <v-breadcrumbs :items="breadcrumbs" divider=">">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :disabled="item.disabled"
        >
          <router-link :to="{ name: item.linkName }">
            <v-icon v-if="item.icon" class="mr-2">
              {{ item.icon }}
            </v-icon>
            {{ item.text }}
          </router-link>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </v-app-bar>
</template>

<script>

export default {
  name: 'BreadcrumbsBar',
  computed: {
    currentRouteText() {
      return this.$route.meta.text
    },
    breadcrumbs() {
      const breadcrumbs = this.$route.meta.breadcrumbs.map(b => ({
        icon: b.name == 'home' ? 'fa fa-home' : '',
        text: b.text,
        disabled: b.disabled ? b.disabled : !this.isValidRoute(b.name),
        linkName: b.name
      }))

      breadcrumbs.push({
        text: this.$route.meta.breadcrumbsText ? this.route.meta.breadcrumbsText : this.$route.meta.text,
        linkName: this.$route.name,
        disabled: true,
      })

      return breadcrumbs
    },
  },
  methods: {
    isValidRoute(routeName) {
      if (routeName == 'home') {
        return true
      }
      const route = this.$router.resolve({ name: routeName })
      return route.href != '/'
    }
  }
}
</script>

<style scoped lang="scss">
.bottom-app-bar {
  transform: translateY(64px) !important;
}
</style>