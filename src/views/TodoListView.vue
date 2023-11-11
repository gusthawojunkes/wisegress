<template>
    <v-container class="w-50 pt-12">
        <List :previewMode="previewMode" :tasks="tasks" @updateList="updateList" :typeList="typeList" />
    </v-container>
</template>

<script>
import List from '@/components/List.vue'
import TodoService from "@/services/todo.service";
export default {
    name: 'TodoItemView',
    async mounted() {
      await this.updateList();
    },
    data() {
        return {
            previewMode: 'todo',
            typeList: 'todo',
            tasks: []
        }
    },
    methods: {
        async getTasks() {
            return await TodoService.findAll();
        },
        async updateList() {
            this.tasks = await this.getTasks();
        }
    },
    components: {
        List
    }
}
</script>

<style></style>
