<template>
    <div class="h-screen">
        <v-sheet class="d-flex flex-wrap h-screen">
            <v-sheet class="d-flex flex-fill align-center justify-end pa-14">
                <div>
                    <h2 class="text-h2">Wisegress</h2>
                </div>
            </v-sheet>
            <v-sheet class="d-flex flex-fill align-center pa-14">
                <div class="w-50">
                    <h5 class="text-h5 mb-12">Cadastro</h5>
                    <v-form v-model="form" @submit.prevent="onSubmit">
                        <v-text-field v-model="name" label="Nome" variant="outlined" :rules="[rules.required]">
                        </v-text-field>
                        <v-text-field v-model="date" label="Data" variant="outlined" :rules="[rules.required]" type="date">
                        </v-text-field>
                        <v-text-field v-model="email" label="Email" variant="outlined"
                            :rules="[rules.required, rules.email]" placeholder="exemplo@gmail.com">
                        </v-text-field>
                        <v-text-field v-model="password" label="Senha" variant="outlined" :rules="[rules.required]"
                            type="password">
                        </v-text-field>
                        <v-text-field v-model="confirmPassword" label="Confirme sua Senha"
                            :rules="[rules.required, rules.samePasswords]" type="password" variant="outlined">
                        </v-text-field>
                        <v-btn block class="mt-6 btn-positive-action" type="submit" :disabled="!form">Cadastre-se</v-btn>
                    </v-form>
                </div>
            </v-sheet>
        </v-sheet>
        <v-snackbar v-model="snackbar" :timeout="1000" :color="alertColor" variant="tonal">
            {{ alertMsg }}
        </v-snackbar>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'Register',
    data() {
        return {
            snackbar: false,
            alertMsg: '',
            alertColor: '',
            form: false,
            name: '',
            date: '',
            email: '',
            password: '',
            confirmPassword: '',
            rules: {
                required: value => !!value || 'Campo obrigatório!',
                samePasswords: value => value === this.password || 'As senhas não coincidem.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'E-mail inválido.'
                },
            },
        }
    },
    methods: {
        async onSubmit() {
            try {
                // await axios.get('')

                this.snackbar = true
                this.alertColor = 'success'
                this.alertMsg = 'Usuário cadastrado com sucesso!'

                await this.onRegister()
            } catch (error) {
                this.snackbar = true
                this.alertColor = 'error'
                this.alertMsg = 'Erro ao cadastrar usuário!'
            }
        },
        async onRegister() {
            setTimeout(() => {
                this.$router.push('/login')
            }, 1000)
        }
    },
}
</script>
<style scoped></style>