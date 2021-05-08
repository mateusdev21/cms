<template>
  <v-list class="nav-menu-list">
    <template v-for='item in items'>
      <v-list-group
        v-if='item.children && item.children.length && !mini'
        :key="item.text"
        color="white"
        :class="{ 'route-active': isActive(item) }"
      >
        <v-list-item
          slot='activator'
          class="pl-0"
          @click="() => navigate(item)"
          :ripple="false"
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-truncate">{{item.text}}</v-list-item-title>
        </v-list-item>
        <item-list class='py-0 pl-3' :items='item.children'/>
      </v-list-group>

      <v-list-item
        v-else
        :key="item.text"
        link
        color="white"
        :class="{ 'route-active': isActive(item) }"
        @click="() => navigate(item)"
      >
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="text-truncate">{{item.text}}</v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'item-list',
  props: {
    items: Array,
    mini: Boolean,
  },
  data: () => ({
  }),
  methods: {
    navigate(item) {
      if (!item.link || this.$route.path == item.link) {
        return 
      }
      this.$router.push(item.link)
    },
    isActive(item) {
      return (
        this.$route.name == item.linkName
      ) || (
        this.$route.meta.breadcrumbs
          ? this.$route.meta.breadcrumbs.map(b => b.name).includes(item.linkName)
          : false
        )
    }
  }
}
</script>

<style lang="scss">
.nav-menu-list {
  .v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon {
    margin-left: 0;
    width: 10px;
  }
  .v-list-group__header {
    .v-list-item--link:hover::before {
      opacity: 0;
    }
  }
  .v-list-group.route-active {
    > .v-list-item::before {
      opacity: 0.2;
    }
  }
  .route-active::before {
    opacity: 0.2;
  }
}
</style>