<template>
  <q-page v-if="currentPage" padding class="row q-gutter-md">
    <div class="col">
      <q-card id="imageCard">
        <ImageViewer
          class="col"
          :src="currentPage.image_url"
          :resize="true"
          alt="page image"
        />
      </q-card>
    </div>

    <q-card class="col" style="height: 88vh">
      <div class="row justify-center bg-grey-1" id="paginationContainer">
        <q-pagination
          v-model="currentPageNum"
          min="1"
          :max="pages.length"
          input
        />
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
      pages: null,
      currentPageNum: 1,
      currentPage: null,
    };
  },

  watch: {
    currentPageNum() {
      this.fetchPage(this.pages[this.currentPageNum - 1]);
    },
  },

  computed: {
    currentPageContent: {
      get: function () {
        return this.currentPage.content;
      },
      set: function (newValue) {
        this.currentPage.content = newValue;
      },
    },
  },

  methods: {
    async fetchPage(page_id) {
      const { pecha, text } = this.$route.params;
      const response = await this.$api.get(`/${pecha}/${text}/${page_id}`);
      this.currentPage = await response.data;
    },
  },

  async created() {
    const { pecha, text } = this.$route.params;
    const response = await this.$api.get(`/${pecha}/${text}/pages`);
    this.pages = await response.data;

    this.fetchPage(this.pages[0]);
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
