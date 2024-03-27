<template>
  <div>
    <q-list separator>
      <q-item v-for="text in texts" :key="text.id">
        <q-item-section avatar>
          <q-badge color="secondary">
            {{ text.id }}
          </q-badge>
        </q-item-section>
        <q-item-section> {{ text.title }}</q-item-section>
        <q-item-section side>
          <q-btn-dropdown dense outline color="primary" icon="edit">
            <q-list dense>
              <q-item disable v-close-popup :to="`/${pecha}/text/${text.id}`">
                <q-item-section>
                  <q-item-label>Text</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup :to="`/${pecha}/note/${text.id}`">
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
      texts: [],
    };
  },

  async created() {
    const response = await this.$api.get(`/${this.pecha}/texts`);
    this.texts = await response.data;
  },
};
</script>
