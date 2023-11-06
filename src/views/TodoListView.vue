<template>
    <v-container class="w-50 pt-12">
        <List :previewMode="previewMode" :tasks="tasks" @updateList="updateList" :typeList="typeList" />
    </v-container>
</template>
  
<script>
import List from '@/components/List.vue'
export default {
    name: 'TodoItemView',
    data() {
        return {
            previewMode: 'todo',
            typeList: 'todo',
            tasks: this.getTasks()
        }
    },
    methods: {
        getTasks() {
            return [
                {
                    uuid: '1',
                    description: 'Teste 1',
                    priority: 'Alta',
                    done: false,
                },
                {
                    uuid: '2',
                    description: 'Teste 2',
                    priority: 'Média',
                    done: false,
                },
                {
                    uuid: '3',
                    description: 'Teste 3',
                    priority: 'Baixa',
                    done: true,
                }
            ]
        },
        updateList() {
            this.tasks = this.getTasks() // GET
        }
    },
    components: {
        List
    }
}
</script>
  
<style></style>
  