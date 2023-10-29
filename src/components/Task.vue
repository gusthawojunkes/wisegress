<template>
    <div>
        <v-card class="mt-4">
            <div class="h-100 d-flex align-center justify-space-between pa-6">
                <div class="h-100 d-flex align-center">
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-btn class="ml-6 mr-6 btn-positive-action" variant="outlined" v-bind="props"
                                :text="isHovering ? '✔' : undefined" @click="done()">
                            </v-btn>
                        </template>
                    </v-hover>
                    <div>
                        <v-card-title>{{ task.description }}</v-card-title>
                        <v-chip class="ml-4" color="#6D8B89">{{ task.priority }}</v-chip>
                    </div>
                </div>
                <v-btn class="ml-6 mr-6" variant="plain" v-bind="props" @click="edit()">
                    <svg-icon type="mdi" :path="pathEdit" size="25" color="#47667B" float="rigth"></svg-icon>
                </v-btn>
            </div>
        </v-card>
    </div>
</template>
  
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import * as md from '@mdi/js';
export default {
    name: 'Task',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    components: {
        SvgIcon
    },
    data() {
        return {
            isHovering: false,
            custom: false,
            pathEdit: md.mdiPencil,
            isChecked: false,
            taskUsed: this.task
        }
    },
    methods: {
        done() {
            this.taskUsed.done = true;
            this.$emit('taskDone', this.taskUsed);
        },
        edit() {
            this.$emit('taskEdit', this.taskUsed.uuid);
        }
    },
}
</script>
  
<style scoped></style>