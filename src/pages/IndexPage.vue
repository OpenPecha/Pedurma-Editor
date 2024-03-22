<template>
  <q-page class="flex flex-center">
    <div class="row q-gutter-lg">
      <q-card
        v-ripple
        flat
        bordered
        style="width: 300px"
        class="column cursor-pointer q-hoverable"
        @click="open('/text')"
      >
        <q-img src="~/assets/img/pedurma_text.png" style="height: 200px" />
        <q-separator />
        <q-card-section class="bg-primary text-white">
          <div class="text-h5 q-mt-sm q-mb-xs">Text Editor</div>
        </q-card-section>
      </q-card>

      <q-card
        v-ripple
        flat
        bordered
        style="width: 300px"
        class="column cursor-pointer q-hoverable"
        @click="open('/note')"
      >
        <q-img src="~/assets/img/pedurma_note.png" style="height: 200px" />
        <q-separator />
        <q-card-section class="bg-primary text-white">
          <div class="text-h5 q-mt-sm q-mb-xs">བསྡུར་མཆན་ Editor</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",

  methods: {
    open(path) {
      if (path.match("https")) {
        openURL(path);
      } else {
        this.$router.push(path);
      }
    },
  },
});
</script>
