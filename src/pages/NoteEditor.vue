<template>
  <q-page padding class="row q-gutter-md">
    <div class="col">
      <q-card id="imageCard">
        <ImageViewer
          class="col"
          :src="currentImageUrl"
          :resize="true"
          alt="page image"
        />
      </q-card>
    </div>

    <q-card class="col" style="height: 88vh">
      <div class="row justify-center bg-grey-1" id="paginationContainer">
        <q-pagination v-model="currentPageNum" min="1" max="10" input />
      </div>

      <textarea name="textarea" v-model="currentPageContent"></textarea>
    </q-card>
  </q-page>
</template>

<script>
import ImageViewer from "components/ImageViewer.vue";

export default {
  name: "NoteEditor",

  components: {
    ImageViewer,
  },

  data() {
    return {
      pages: ["", ""],
      currentPageNum: 1,
    };
  },

  computed: {
    currentImageUrl() {
      return "https://iiif.bdrc.io/bdr:I1PD95846::I1PD958461520.jpg/full/max/0/default.jpg";
    },

    currentPageContent: {
      get: function () {
        return "page content";
      },
      set: function (newValue) {
        this.pages[0] = newValue;
      },
    },
  },
};
</script>

<style scoped>
#imageCard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88vh;
  overflow: auto;
}

textarea {
  width: 100%;
  height: 83vh;
  padding: 4px;
  font-size: 1.2rem;
  line-height: 2;
  overflow: auto;

  border: 1px solid #d7d7d7;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  outline: none;
  transition: border-color 0.25s ease;
  resize: none;
}

textarea:focus {
  border-color: #d86ef6;
}
</style>
