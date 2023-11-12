<template>
  <v-col cols="3">
    <v-card class="h-100 pa-4 d-flex flex-column" color="#47667b">
      <v-card-title class="my-4">{{ title }}</v-card-title>
      <v-divider class="mb-6"></v-divider>
      <List :previewMode="previewMode" :tasks="tasks" @updateList="updateList" :filterSituation="filterSituation"
        :taskSituation="taskSituation" />
    </v-card>
  </v-col>
</template>

<script>
import List from '@/components/List.vue'

export default {
  name: 'Column',
  props: {
    title: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      required: true
    },
    filterSituation: {
      type: Boolean,
      required: false,
      default: false
    },
    taskSituation: {
      type: String,
      default: 'PENDING'
    }
  },
  data() {
    return {
      previewMode: 'kanban',
    }
  },
  methods: {
    updateList(updateList) {
      this.$emit('updateList', updateList);
    },
  },
  components: {
    List
  }
}
</script>

<style scoped>
h2 {
  color: white;
}
</style>
