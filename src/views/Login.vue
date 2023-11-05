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
                    <h5 class="text-h5 mb-12">Login</h5>
                    <v-form v-model="form" @submit.prevent="onSubmit">
                        <v-text-field v-model="email" label="Email" variant="outlined"
                            :rules="[rules.required, rules.email]" placeholder="exemplo@gmail.com">
                        </v-text-field>
                        <v-text-field v-model="password" label="Senha" variant="outlined" :rules="[rules.required]"
                            type="password">
                        </v-text-field>
                        <v-btn block class="mt-6 btn-positive-action" type="submit" :disabled="!form">Acessar</v-btn>
                        <div class="d-flex justify-space-between mt-2">
                            <RouterLink to="/recuperar-senha" class="text-decoration-none">
                                <a class="text-caption" rel="noopener noreferrer">
                                    Esqueçeu sua senha?</a>
                            </RouterLink>
                            <RouterLink to="/cadastro" class="text-decoration-none">
                                <a rel="noopener noreferrer" target="_blank">Cadastre-se</a>
                            </RouterLink>
                        </div>
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
import UserService from "@/services/user.service";

export default {
    name: 'Login',
    data() {
        return {
            snackbar: false,
            alertMsg: '',
            alertColor: '',
            form: false,
            email: '',
            password: '',
            rules: {
                required: value => !!value || 'Campo obrigatório!',
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
              await UserService.login({
                email: this.email,
                password: this.password
              });
              this.$router.push('pomodoro')
            } catch (error) {
              console.error(error);
              let message = 'Erro ao realizar o Login!';
              this.snackbar = true
              this.alertColor = 'error'
              if (error && error.message) {
                message = error.message;
              }
              this.alertMsg = message;
            }
        },
    },
}
</script>
<style scoped></style>