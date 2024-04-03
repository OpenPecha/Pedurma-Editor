<template>
  <q-page
    v-if="currentPageContent && currentPageImageUrl"
    padding
    class="row q-gutter-md"
  >
    <div class="col">
      <q-card id="imageCard">
        <ImageViewer class="col" :src="currentPageImageUrl" alt="page image" />
      </q-card>
    </div>

    <q-card class="col" style="height: 88vh">
      <div class="row justify-center bg-grey-1" id="paginationContainer">
        <SaveStatus :status="saveStatus" />
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
import { debounce } from "quasar";
import ImageViewer from "components/ImageViewer.vue";
import SaveStatus from "components/SaveStatus.vue";

export default {
  name: "NoteEditor",

  components: {
    ImageViewer,
    SaveStatus,
  },

  data() {
    return {
      pages: null,
      currentPageNum: 1,
      currentPageContent: null,
      currentPageImageUrl: null,
      saveStatus: "saved",
    };
  },

  watch: {
    async currentPageNum() {
      await this.fetchPage(this.pages[this.currentPageNum - 1]);
      this.saveLastViewedPageNum();
    },

    currentPageContent() {
      if (this.currentPageContent !== null) this.saveStatus = "saving";
      this.debouncedSaveCurrentPage();
    },
  },

  computed: {
    lastViewedPageNumKey() {
      const { pecha, text } = this.$route.params;
      return `PE:${pecha}/${text}/lastViewedPageNum`;
    },

    textId() {
      const { pecha, text } = this.$route.params;
      return `${pecha}/${text}`;
    },
  },

  methods: {
    async fetchPage(page_id) {
      try {
        this.$q.loading.show();
        const { pecha, text } = this.$route.params;
        const response = await this.$api.get(`/${pecha}/${text}/${page_id}`);
        const page = await response.data;
        this.currentPageImageUrl = page.image_url;
        this.currentPageContent = page.content;
      } catch (error) {
        console.error(error);
      } finally {
        this.$q.loading.hide();
      }
    },

    debouncedSaveCurrentPage: debounce(function () {
      this.saveCurrentPage();
      console.log(this.currentPageContent);
    }, 1000),

    async saveCurrentPage() {
      const pageId = this.pages[this.currentPageNum - 1];
      try {
        const { pecha, text } = this.$route.params;
        const response = await this.$api.post(`/${pecha}/${text}/${pageId}`, {
          content: this.currentPageContent,
        });
        this.saveStatus = "saved";
      } catch (error) {
        console.error(error);
      }
    },
    saveLastViewedPageNum() {
      this.$q.localStorage.set(this.lastViewedPageNumKey, this.currentPageNum);
    },

    loadLastViewedPageNum() {
      return this.$q.localStorage.getItem(this.lastViewedPageNumKey);
    },
  },

  async created() {
    const { pecha, text } = this.$route.params;
    const response = await this.$api.get(`/${pecha}/${text}/pages`);
    this.pages = await response.data;

    const lastViewedPageNum = this.loadLastViewedPageNum();
    if (lastViewedPageNum) {
      this.currentPageNum = lastViewedPageNum;
    }

    this.fetchPage(this.pages[this.currentPageNum - 1]);
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
