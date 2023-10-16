<template>
    <v-container class="h-screen" h-100 fluid>
        <!-- <v-row class="text-center">
            <v-col cols="12"> -->
        <Question :question="questions[0]"></Question>
        <h6>{{ "Sua colaboração é fundamental para um começo bem-sucedido com o Wisegress." }}</h6>
        <!-- </v-col>
        </v-row> -->
    </v-container>
</template>

<script>
import Question from '../components/Question.vue'

export default {
    name: 'ProfileRegister',
    data() {
        return {
            questions: [{
                "name": "Quais são seus planos para usar o Wisegress?",
                "answers": [{
                    "icon": "mdiBookOpenBlankVariant",
                    "title": "Estudo"
                },
                {
                    "icon": "laptop",
                    "title": "Trabalho"
                }
                ]
            }]
        }
    },
    methods: {
    },
    components: {
        Question
    }
}
</script>

<style scoped></style>