<template>
    <v-container class="w-50">
        <TodoList />
    </v-container>
</template>
  
<script>
import TodoList from '@/components/TodoList.vue';
export default {
    name: 'TodoListView',
    data() {
        return {
        }
    },
    methods: {
    },
    components: {
        TodoList
    }
}
</script>
  
<style></style>