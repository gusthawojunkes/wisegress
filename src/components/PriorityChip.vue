<template>
  <v-chip class="ma-2" :color="getChipColor(value)">{{ getLabel(value) }}</v-chip>
</template>
<script>
import { getChipColor, getPriorityLabel } from "@/helpers/PriorityHelper";

export default {

  name: 'PriorityChip',
  props: {
    value: {
      type: String,
      required: true
    },
  },
  data() {
    return {}
  },

  methods: {
    getLabel(priority) {
      return getPriorityLabel(priority)
    },

    getChipColor(priority) {
      return getChipColor(priority);
    }
  }
}
</script>