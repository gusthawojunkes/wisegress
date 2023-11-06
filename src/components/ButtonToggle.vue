<template>
    <v-btn-toggle rounded="0" group class="my-2">
        <v-btn v-for="option in options" :key="option.id" @click="selected(option.id)">
            {{ option.name }}
        </v-btn>
    </v-btn-toggle>
</template>
  
<script>
export default {
    props: {
        options: {
            type: Array,
            requered: true,
            default: () => [],
        },
    },
    methods: {
        selected(option) {
            console.log(option);
            this.$emit('selected', option);
        },
    },
}
</script>
  