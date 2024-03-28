<template>
  <q-badge v-if="status === 'saving'" floating>
    <q-icon name="autorenew" /> <span class="q-ml-sm">Saving...</span>
  </q-badge>
  <q-badge v-else floating color="positive">
    <q-icon name="cloud_done" />
    <span class="q-ml-sm fade-away" :class="isFading ? 'fading' : ''"
      >Saved</span
    >
  </q-badge>
</template>

<script>
export default {
  name: "SaveStatus",
  props: ["status"],

  data() {
    return {
      isFading: false,
    };
  },

  mounted() {
    setTimeout(() => {
      this.isFading = true;
    }, 2000);
  },
};
</script>

<style>
.fade-away {
  opacity: 1;
  transition: opacity 1s ease-in-out; /* Adjust duration and timing as needed */
}

.fade-away.fading {
  display: none;
}
</style>
