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
                        <v-text-field v-model="date" label="Data de nascimento" variant="outlined" :rules="[rules.required]" type="date">
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

                      <v-alert
                          v-if="hasCritics"
                          type="warning"
                          density="compact"
                          variant="tonal"
                          closeable
                          icon="mdi-material-design"
                      >
                        <ul>
                          <li v-for="message in critics" :key="message">
                            {{ message }}
                          </li>
                        </ul>

                      </v-alert>
                        <v-btn block class="mt-6 btn-positive-action" type="submit" :disabled="!form || waitingRegister">
                          <v-progress-circular
                              v-if="waitingRegister"
                              indeterminate
                              size="24"
                              width="2"
                              color="white"
                          ></v-progress-circular>
                            {{ waitingRegister ? "" : "Cadastre-se" }}
                        </v-btn>

                    </v-form>
                </div>
            </v-sheet>
        </v-sheet>
        <v-snackbar v-model="snackbar" :timeout="3000" :color="alertColor" variant="tonal">
            {{ alertMsg }}
        </v-snackbar>
    </div>
</template>
<script>
import UserService from "@/services/user.service";

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
            waitingRegister: false,
            hasCritics: false,
            critics: [],
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
                this.waitingRegister = true;
                this.hasCritics = false;
                this.critics = [];
                const user = await UserService.register({
                  name: this.name,
                  email: this.email,
                  password: this.password,
                  birthday: this.date
                });

                console.log(user);

                this.snackbar = true
                this.alertColor = 'success'
                this.alertMsg = 'Cadastro realizado com sucesso!'

                await this.onRegister()
            } catch (error) {
                let message = 'Um erro inesperado aconteceu ao cadastrar o usuário!'
                if (error) {
                    if (error.message) {
                      message = error.message;
                    }
                    if (error.critics) {
                      this.hasCritics = true;
                      for (const critic of error.critics) {
                        console.log(critic.message)
                        this.critics.push(critic.message);
                      }
                    }
                }

                this.snackbar = true;
                this.alertColor = 'error';
                this.alertMsg = message;
            } finally {
              this.waitingRegister = false;
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