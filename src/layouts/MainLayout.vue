<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-show="!isIndexPage" flat rounded icon="arrow_back" to="/" />
        <q-toolbar-title class="text-center">
          <q-avatar>
            <img src="https://openpecha.org/logo.png" />
          </q-avatar>
          Pedurma Editor
        </q-toolbar-title>
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
  },
};
</script>
