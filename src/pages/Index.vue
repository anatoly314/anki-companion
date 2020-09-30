<template>
  <q-page class="flex column">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
    >
      <q-tab name="cards" label="cards" />
      <q-tab name="images" label="images" />
      <q-tab name="audio" label="audio" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab">
      <q-tab-panel name="cards">
        cards
      </q-tab-panel>

      <q-tab-panel name="images">
        images
      </q-tab-panel>

      <q-tab-panel name="audio">
        audio
      </q-tab-panel>
    </q-tab-panels>

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      tab: 'cards'
    }
  }
}
</script>
