<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <h3 class="mb-12">{{ question.name }}</h3>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col v-for="(answer, i) in question.answers" :key="i" cols="auto">
                <v-card class="pa-12" style="border: 1px solid #A5C3A7;" @click="cardClick(question.answers[i].title)">
                    <v-card-item>
                        <svg-icon type="mdi" :path="md[question.answers[i].icon]" size="100" color="#47667B"></svg-icon>
                        <v-card-title class="text-center">
                            {{ answer.title }}
                        </v-card-title>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import * as md from '@mdi/js';
export default {
    name: 'Question',
    props: {
        question: {
            type: Object,
            required: true
        },
        answers: {
            type: Array,
            required: true
        }
    },
    components: {
        SvgIcon
    },
    computed: {
        md() {
            return md;
        },
    },
    methods: {
        cardClick(answer) {
            this.$emit('selectedAnswer', answer);
        }
    }
}
</script>

<style scoped>
.svg-icon {
    color: #47667B;
}
</style>