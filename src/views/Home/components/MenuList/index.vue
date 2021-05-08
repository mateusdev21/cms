<template>
  <NestedVList :items="menus" :mini="mini" />
</template>

<script>
import NestedVList from '../../../../components/NestedVList'

export default {
  name: 'MenuList',
  props: {
    mini: Boolean,
  },
  components: {
    NestedVList
  },
  data: () => ({
    menus: [
      {
        text: 'Dashboard',
        icon: 'fa fa-dashboard fa-fw',
        link: '/',
        // If item does not have a link
        // linkName is required to show highlight the link as active
      },
      {
        text: 'Report',
        icon: 'fa fa-file fa-fw',
        // If item does not have a link
        // linkName is required to show highlight the link as active
        linkName: 'report',
        children: [
          {
            text: 'Call Report',
            icon: 'fa fa-table fa-fw',
            link: '/report/call-report/smd',
            linkName: 'call-report',
          },
        ]
      },
      {
        text: 'Master Data',
        icon: 'fa fa-database fa-fw',
        // If item does not have a link
        // linkName is required to show highlight the link as active
        linkName: 'master-data',
        children: [
          {
            text: 'Movies List',
            icon: 'fa fa-film fa-fw',
            link: '/master-data/movies',
            linkName: 'car-list',
          },
          {
            text: 'Transaction',
            icon: 'fa fa-money fa-fw',
            link: '/master-data/transaction',
            linkName: 'car-list',
          },
        ]
      },
    ]
  })
}
</script>

<style>

</style>
