<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-show="!isIndexPage" flat rounded icon="arrow_back" to="/" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://openpecha.org/logo.png" />
          </q-avatar>
          Pedurma Editor
        </q-toolbar-title>
        <q-breadcrumbs
          v-if="textMeta"
          active-color="white"
          style="font-size: 16px"
        >
          <q-breadcrumbs-el :label="textMeta.pecha" icon="calendar_view_day" />
          <q-breadcrumbs-el :label="textMeta.textId" icon="import_contacts" />
        </q-breadcrumbs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const katenBoEn = {
  kangyur: "བཀའ་འགྱུར་",
  tengyur: "བསྟན་འགྱུར",
};
export default {
  computed: {
    isIndexPage() {
      return this.$router.currentRoute.value.path === "/";
    },
    textMeta() {
      let { pecha, text: textId } = this.$route.params;
      if (!pecha) return;
      pecha = katenBoEn[pecha];
      return { pecha, textId };
    },
  },
};
</script>
