<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="displayToolbar">
      <q-toolbar>
        <slot name="header"></slot>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <slot/>
    </q-page-container>

    <q-footer>
      <slot name="footer"></slot>
    </q-footer>
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
      this.$nextTick(() => {
        window.dispatchEvent(new Event('resize'));
      })
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
