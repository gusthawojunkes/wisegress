<template>
    <v-container fluid>
        <h3>{{ question.name }}</h3>
        <v-row class="d-flex justify-center">
            <v-col v-for="(answer, i) in question.answers" :key="i" cols="auto">
                <v-card class="mx-auto">
                    <v-card-item>
                        <svg-icon type="mdi" :path="path" class="svg-icon"></svg-icon>
                        <v-card-subtitle>
                            {{ answer.title }}
                        </v-card-subtitle>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import * as mdi from '@mdi/js';

export default {
    name: 'Question',
    props: {
        question: {
            type: Object,
            required: true
        }
    },
    components: {
        SvgIcon
    },
    data() {
        return {
            path: mdi.mdiBookOpenBlankVariant,
        }
    }
}
</script>

<style scoped>
.svg-icon {
    color: #47667B;
}
</style>