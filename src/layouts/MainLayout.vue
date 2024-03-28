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
        {{ textId }}
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  computed: {
    isIndexPage() {
      return this.$router.currentRoute.value.path === "/";
    },
    textId() {
      const { pecha, text } = this.$route.params;
      return `${pecha}/${text}`;
    },
  },
};
</script>
