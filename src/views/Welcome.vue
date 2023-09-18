<template>
    <div class="h-screen">
        <v-sheet class="d-flex flex-wrap h-screen">
            <v-sheet class="d-flex flex-1-0 align-end pa-14">
                <div>
                    <p class="text-h5">Bem Vindo ao</p>
                    <p class="text-h1">Wisegress</p>
                </div>
            </v-sheet>

            <v-sheet class="d-flex flex-0-1 pa-14">
                <RouterLink to="/cadastro">
                    <v-btn id="register" class="ma-2">Cadastre-se</v-btn>
                </RouterLink>
                <RouterLink to="/login">
                    <v-btn id="login" class="ma-2">Acessar</v-btn>
                </RouterLink>
            </v-sheet>
        </v-sheet>
    </div>
</template>
  
<script>
export default {
    name: 'Welcome',
    data() {
        return {
        }
    }
}
</script>
  
<style scoped>
#login {
    background-color: #47667B;
}

#register {
    background-color: #D5E0B5;
}
</style>