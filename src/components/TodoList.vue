<template>
    <v-container class="h-100 d-flex align-center h-100">
        <v-col>
            <v-row justify="center">
                <v-dialog v-model="dialog" class="w-50">
                    <template v-slot:activator="{ props }">
                        <v-btn block class="mt-12 mb-12 btn-positive-action" v-bind="props">
                            Adicionar Tarefa
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5" @click="clearTask()">Nova Tarefa</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form v-model="form" @submit.prevent="onSubmit(task.uuid)">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field label="Descrição" variant="outlined" required
                                                v-model="task.description" :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-select label="Prioridade*" variant="outlined" required
                                                v-model="task.priority" :rules="[rules.required]"
                                                :items="priority"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-spacer></v-spacer>
                                    <v-btn class="btn-positive-action mr-6" variant="text" @click="dialog = false"
                                        type="submit" :disabled="!form">
                                        Salvar
                                    </v-btn>
                                    <v-btn class="btn-negative-action" variant="text" @click="dialog = false">
                                        Cancelar
                                    </v-btn>
                                </v-form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
            <div v-for="task in tasks" :key="task.uuid">
                <TodoItem v-if="!task.done" :task="task" @taskDone="taskDone" @taskEdit="selectTask" />
            </div>
        </v-col>
    </v-container>
</template>
  
<script>
import TodoItem from '@/components/TodoItem.vue'

export default {
    name: 'TodoList',
    props: {
    },
    data() {
        return {
            form: false,
            dialog: false,
            selectedTaskUuid: '',
            task: {
                uuid: '',
                description: '',
                priority: '',
                done: false,
                situation: 'pending'
            },
            priority: [
                'Maior Prioridade',
                'Prioridade Alta',
                'Prioridade Média',
                'Prioridade Baixa',
                'Menor Prioridade'
            ],
            tasks: [
            ],
            rules: {
                required: value => !!value || 'Campo obrigatório!',
            }
        }
    },
    methods: {
        async onSubmit(taskUuid) {
            try {
                if (taskUuid) {
                    this.editTask(taskUuid)
                } else {
                    this.addTask(this.task)
                }
            } catch (error) {
                console.log(`Error: ${error.message}`)
            }
            this.clearTask()
        },
        clearTask() {
            this.task = {
                uuid: '',
                description: '',
                priority: '',
                done: false,
                situation: 'pending'
            }
        },
        addTask(task) {
            this.task.uuid = Math.random().toString(36).substr(2, 9)
            this.tasks.push(task)
        },
        editTask(taskUuid) {
            const index = this.tasks.findIndex(task => task.uuid === taskUuid)
            this.tasks.splice(index, 1, this.task)
        },
        // eslint-disable-next-line no-unused-vars
        selectTask(selectedTaskUuid) {
            this.dialog = true
            const index = this.tasks.findIndex(task => task.uuid === selectedTaskUuid)
            this.task = this.tasks[index]
        },
        getTasks() {
            console.log('dialog = ', this.dialog)
        },
        doTask(task, done = false) {
            console.log('done = ', done)

            if (!done) return true

            this.tasks.splice(this.tasks.indexOf(task), 1)
        },
        taskDone(taskDone = false) {
            const index = this.tasks.findIndex(task => task.uuid === taskDone.uuid)
            this.tasks.splice(index, 1, taskDone)

            console.log(JSON.stringify(this.tasks))
            this.clearTask()
        }
    },
    components: {
        TodoItem
    },
    created() {
        this.getTasks()
    },
    watch: {
        dialog(dialog) {
            if ((!dialog)) {
                this.getTasks()
            }
        },
    }
}
</script>
  
<style scoped></style>