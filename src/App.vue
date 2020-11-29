<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    // https://stackoverflow.com/questions/55206618/enable-console-logging-of-router-events-in-vue
    '$route' (to, from) {
      console.log('Route changed from ' + from.path + ' to ' + to.path);
    }
  }
}
</script>

<style scoped>
  #q-app{
    height: 100%;
  }
</style>
