<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="displayHeader">
      <q-toolbar>
        <slot name="header"></slot>
      </q-toolbar>
    </q-header>

    <q-drawer :breakpoint="0" behavior="desktop" v-model="displayLeftDrawer" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer :breakpoint="0" behavior="desktop" v-model="displayRightDrawer" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <slot/>
    </q-page-container>

    <q-footer v-if="displayFooter">
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
      displayHeader: true,
      displayLeftDrawer: true,
      displayRightDrawer: true,
      displayFooter: true
    }
  },
  methods: {
    toggleViewElement (event, toggleRequest) {
      this['display' + toggleRequest.element.capitalizeFirstLetter()] = toggleRequest.checked;
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 200);
    }
  },
  mounted () {
    window.ipcRenderer.on('show-hide-toolbar', this.toggleViewElement);
  },
  beforeDestroy () {
    window.ipcRenderer.removeListener('show-hide-toolbar', this.toggleViewElement);
  }
}
</script>

<style scoped>
.q-layout, .q-page-container{
  height: 100%;
}
</style>
