<template>
    <div>
        <Questions :variants="variants"></Questions>
    </div>
</template>

<script>
import Questions from '../components/Question.vue'

export default {
    name: 'ProfileRegister',
    data() {
        return {
            variants: [
                'primary',
                'secondary',
                'accent',
                'error',
                'warning',
                'info',
                'success'
            ],
            questions: [{
                "question": "Quais são seus planos para usar o Wisegress?",
                "answers": [{
                    "icon": "book",
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
        Questions
    }
}
</script>

<style scoped></style>