<template>
    <div class="h-screen">
        <v-sheet class="d-flex flex-wrap h-screen">
            <v-sheet class="d-flex flex-fill align-center justify-end pa-14">
                <div>
                    <p class="text-h2">Wisegress</p>
                </div>
            </v-sheet>
            <v-sheet class="d-flex flex-fill align-center pa-14">
                <div class="w-50">
                    <p class="text-h5 mb-12">Cadastro</p>
                    <v-form v-model="form" @submit.prevent="onSubmit">
                        <v-text-field label="Nome" variant="outlined" :rules="[required]">
                        </v-text-field>
                        <v-text-field label="Data" variant="outlined" :rules="[required]" type="date">
                        </v-text-field>
                        <v-text-field label="Email" variant="outlined" :rules="[required]">
                        </v-text-field>
                        <v-text-field label="Senha" variant="outlined" :rules="[required]">
                        </v-text-field>
                        <v-text-field label="Confirme sua Senha" :rules="[required]" variant="outlined">
                        </v-text-field>
                        <v-btn block class="mt-6" type="submit" :disabled="!form">Cadastre-se</v-btn>
                    </v-form>
                </div>
            </v-sheet>
        </v-sheet>
    </div>
</template>
<script>
export default {
    name: 'Register',
    data() {
        return {
            form: false
        }
    },
    methods: {
        required(v) {
            return !!v || 'Campo obrigatório!'
        },
    }
}
</script>
<style scoped></style>