<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="displayToolbar">
      <q-toolbar>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: {
  },
  data () {
    return {
      displayToolbar: true
    }
  },
  methods: {
    toggleToolbar (event, toggleRequest) {
      this.displayToolbar = toggleRequest.checked;
    }
  },
  mounted () {
    window.ipcRenderer.on('show-hide-toolbar', this.toggleToolbar);
  },
  beforeDestroy () {
    window.ipcRenderer.removeListener('show-hide-toolbar', this.toggleToolbar);
  }
}
</script>

<style scoped>
.q-layout, .q-page-container{
  height: 100%;
}
</style>
