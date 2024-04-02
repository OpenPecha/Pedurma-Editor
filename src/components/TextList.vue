<template>
  <div>
    <q-input dense filled v-model="search" label="Search">
      <template v-slot:append>
        <q-icon v-if="search === ''" name="search" />
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer"
          @click="search = ''"
        />
      </template>
    </q-input>
    <q-list separator>
      <q-item v-for="text in filteredTexts" :key="text.id">
        <q-item-section avatar>
          <q-badge color="secondary">
            {{ text.id }}
          </q-badge>
        </q-item-section>
        <q-item-section> {{ text.title }}</q-item-section>
        <q-item-section side>
          <q-btn-dropdown size="10px" flat ripple color="primary" icon="edit">
            <q-list dense>
              <q-item disable v-close-popup :to="`/${pecha}/${text.id}/text`">
                <q-item-section>
                  <q-item-label>Text</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup :to="`/${pecha}/${text.id}/note`">
                <q-item-section>
                  <q-item-label>བསྡུར་མཆན་</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "VolumeList",
  props: ["pecha"],

  data() {
    return {
      search: "",
      texts: [],
    };
  },

  computed: {
    filteredTexts() {
      return this.texts.filter((text) => {
        return (
          text.id.toLowerCase().includes(this.search.toLowerCase()) ||
          text.title.includes(this.search)
        );
      });
    },
  },

  async created() {
    const response = await this.$api.get(`/${this.pecha}/texts`);
    this.texts = await response.data;
  },
};
</script>
