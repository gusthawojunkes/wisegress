<template>
    <SideBar />
    <v-container class="w-50">
        <TodoList />
    </v-container>
</template>
  
<script>
import TodoList from '@/components/TodoList.vue';
import SideBar from '@/components/SideBar.vue'
export default {
    name: 'TodoListView',
    data() {
        return {
        }
    },
    methods: {
    },
    components: {
        SideBar,
        TodoList
    }
}
</script>
  
<style></style>