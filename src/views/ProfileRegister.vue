<template>
    <v-container class="h-screen d-flex align-center" h-100 fluid>
        <v-col>
            <v-row class="d-flex justify-center">
                <div v-for="(question, q) in questions" :key="q">
                    <Question v-if="validateShowQuestion(questions, question, q)" :question="question"
                        @selectedAnswer="addAnswer">
                    </Question>
                </div>
            </v-row>
            <v-row class="d-flex justify-center" v-if="!showFinishedMessage">
                <div class="w-25">
                    <h5 class="mt-12 text-center">
                        {{ "Sua colaboração é fundamental para um começo bem-sucedido com o Wisegress." }}
                    </h5>
                </div>
            </v-row>
            <v-row class="d-flex justify-center text-center" v-if="showFinishedMessage">
                <v-col>
                    <h5>Obrigado pela contribuição.</h5>
                    <br>
                    <h1>Seja Bem Vindo!</h1>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import Question from '../components/Question.vue'

export default {
    name: 'ProfileRegister',
    data() {
        return {
            showFinishedMessage: false,
            currentQuantity: null,
            questions: [{
                "name": "Quais são seus planos para usar o Wisegress?",
                "answers": [{
                    "icon": "mdiBookOpenBlankVariant",
                    "title": "Estudo"
                },
                {
                    "icon": "mdiLaptop",
                    "title": "Trabalho"
                }
                ],
                "answer": null
            }, {
                "name": "Qual é o seu nível de conhecimento em inglês?",
                "answers": [{
                    "icon": "mdiBookOpenBlankVariant",
                    "title": "Básico"
                },
                {
                    "icon": "mdiLaptop",
                    "title": "Intermediário"
                },
                {
                    "icon": "mdiLaptop",
                    "title": "Avançado"
                }
                ],
                "answer": null
            }, {
                "name": "Qual é o seu nível de conhecimento em programação?",
                "answers": [{
                    "icon": "mdiBookOpenBlankVariant",
                    "title": "Básico"
                },
                {
                    "icon": "mdiLaptop",
                    "title": "Intermediário"
                },
                {
                    "icon": "mdiLaptop",
                    "title": "Avançado"
                }
                ],
                "answer": null
            }]
        }
    },
    components: {
        Question
    },
    methods: {
        addAnswer(answer) {
            this.questions[this.currentQuantity].answer = answer;
        },
        validateShowQuestion(questions, question, selectedQuestion) {
            if ((this.currentQuantity + 1 == questions.length) && (questions[questions.length - 1].answer != null)) {
                this.showFinishedMessage = true;
            }
            if ((question.answer == null) && (selectedQuestion == 0) ||
                ((selectedQuestion > 0) &&
                    (questions[selectedQuestion].answer == null) &&
                    (questions[selectedQuestion - 1].answer != null))) {
                this.currentQuantity = selectedQuestion;
                return true
            }
            return false;
        },
        async onFinished() {
            setTimeout(() => {
                this.$router.push('/todo')
            }, 1000)
        }
    },
    watch: {
        async showFinishedMessage(newValue) {
            if (newValue === true) {
                await this.onFinished()
            }
        },
    },
}
</script>

<style scoped></style>