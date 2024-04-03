<template>
  <inner-image-zoom v-if="!error" :src="src" :zoomSrc="src" />

  <div v-else class="column items-center">
    <q-icon name="error" size="xl" class="text-grey" />
    <div class="text-grey q-mt-md">
      <div class="text-h5 text-center">Failed to load the image</div>
      <div class="text-center text-light">Please reload the page</div>
    </div>
  </div>
</template>

<script>
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import InnerImageZoom from "vue-inner-image-zoom";

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      error: false,
    };
  },

  components: {
    "inner-image-zoom": InnerImageZoom,
  },

  computed: {
    srcSmall() {
      if (!this.resize) {
        return this.src;
      }
      const splitedURL = this.src.split("max");
      return splitedURL[0] + "pct:50" + splitedURL[1];
    },
  },

  // mounted() {
  //   const img = document.querySelector(".iiz__img");
  //   img.addEventListener("error", (err) => {
  //     this.error = true;
  //   });
  // },
};
</script>

<style scoped></style>
