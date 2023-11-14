<template>
    <v-overlay :model-value="isHovering" contained class="align-center justify-center">
        <div>
            <v-hover>
                <v-card class="mx-auto text-center pa-8">
                    <v-card-text class="mb-4">
                        <h2 class="text-h6">
                            Como você esta se sentido no momento?
                        </h2>
                    </v-card-text>
                    <v-card-title>
                        <v-icon class="mx-4" size="50" v-for="(item, index) in 5" :key="index"
                            @click="setRating(icons[index])" color="#A5C3A7">
                            {{ icons[index] }}</v-icon>
                    </v-card-title>
                    <v-form v-model="form" @submit.prevent="onSubmit()" v-if="rating === 'POOR'" class="mt-6">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Descrição" variant="outlined" required v-model="description"
                                    :rules="[rules.required]"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col clos="12">
                                <v-btn block class="btn-positive-action mr-6" variant="text" type="submit"
                                    :disabled="!form">
                                    Salvar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-hover>
        </div>
    </v-overlay>
</template>

<script>
import { getKeyIconByLabelIcon, getRatingIcon } from '@/helpers/Rating.js'
import FeedbackService from '@/services/feedback.service.js'

export default {
    name: "Feedback",
    props: {
        isHovering: {
            type: Boolean,
            default: false
        },
        feature: {
            type: String,
            required: true,
            validator: function (value) {
                return ['TODO', 'POMODORO', 'KANBAN', 'LIST'].includes(value);
            }
        }
    },
    data() {
        return {
            icons: getRatingIcon(),
            rating: undefined,
            description: '',
            form: false,
            rules: {
                required: (value) => ((!!value) && (this.rating == 'POOR')) || 'Campo obrigatório para a menor avaliação!'
            },
        }
    },
    methods: {
        setRating(value) {
            this.rating = getKeyIconByLabelIcon(value);

            if (this.rating != 'POOR') {
                this.description = '';
                this.form = true;

                this.addFeedback();
            } else {
                this.form = false;
            }
        },
        async addFeedback() {
            const feedback = {
                feature: this.feature,
                rating: this.rating,
                description: this.description
            }

            await FeedbackService.create(feedback);

            this.$emit('feedbackAdded', true);
        },
        onSubmit() {
            this.addFeedback();
        }
    }
}
</script>

<style scoped></style>