<template>
  <div>
    <q-list bordered separator>
      <q-item v-for="vol in volumes" :key="vol">
        <q-item-section avatar>
          <q-icon color="primary" name="import_contacts" />
        </q-item-section>
        <q-item-section>Volume {{ vol }}</q-item-section>
        <q-item-section side>
          <q-btn-dropdown dense outline color="primary" icon="edit">
            <q-list>
              <q-item clickable v-close-popup :to="`/${pecha}/text/${vol}`">
                <q-item-section>
                  <q-item-label>Text</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup :to="`/${pecha}/note/${vol}`">
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

  computed: {
    volumes() {
      let volume_count = this.pecha == "kangyur" ? 108 : 214;
      return Array.from({ length: volume_count }, (_, i) => i + 1);
    },
  },
};
</script>
