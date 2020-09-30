<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      behavior="desktop"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Navigation
        </q-item-label>
        <RouterLink
          @click="leftDrawerOpen = false"
          v-for="link in routerLinks"
          :key="link.title"
          :link="link.link"
          :title="link.title"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import RouterLink from 'components/RouterLink.vue'

const linksData = [
  {
    title: 'Index',
    caption: 'Index page',
    icon: 'school',
    link: 'index'
  },
  {
    title: 'Epub',
    caption: 'Epub page',
    icon: 'school',
    link: 'epub'
  }
]

export default {
  name: 'MainLayout',
  components: {
    RouterLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      routerLinks: linksData
    }
  }
}
</script>
