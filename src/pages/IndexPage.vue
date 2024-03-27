<template>
  <q-page class="flex flex-center">
    <q-card style="width: 600px; height: 80vh">
      <q-tabs
        v-model="tab"
        class="bg-grey-2 text-grey-7"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        inline-label
      >
        <q-tab name="kangyur" label="བཀའ་འགྱུར།" icon="book" />
        <q-tab name="tengyur" label="བསྟན་འགྱུར།" icon="book" />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        class="overflow-auto"
        style="height: 72vh"
      >
        <q-tab-panel name="kangyur">
          <TextList :pecha="tab" />
        </q-tab-panel>

        <q-tab-panel name="tengyur">
          <TextList :pecha="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import TextList from "components/TextList.vue";

export default {
  name: "IndexPage",

  components: {
    TextList,
  },

  data() {
    return {
      tab: "kangyur",
    };
  },
};
</script>
