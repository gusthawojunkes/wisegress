import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Login from '../../views/Login.vue'

describe('Login', async () => {
    const wrapper = mount(Login)

    it('deve renderizar o formulário de login', () => {
        expect(wrapper.find('form').exists())
    })

    it('deve desabilitar o botão de login quando o formulário estiver inválido', async () => {
        expect(wrapper.find('v-form').attributes('form')).toBeUndefined()
    })

    it('deve habilitar o botão de login quando o formulário estiver válido', async () => {
        await wrapper.setData({ email: 'teste@teste.com', password: 'senha123' })
        expect(wrapper.find('v-btn').attributes('form')).toBeUndefined()
    })

    it('deve exibir uma mensagem de erro quando as credenciais estiverem incorretas', async () => {
        await wrapper.setData({ email: 'teste@teste.com', password: 'senha123' })
        await wrapper.vm.onSubmit()
        expect(wrapper.find('v-snackbar').isVisible()).toBe(true)
    })

    it('deve realizar o login com sucesso', async () => {
        await wrapper.setData({ email: 'teste@teste.com', password: 'senha123' })
        await wrapper.vm.onSubmit()
    })

    it('deve exibir uma mensagem de erro para o formato de email inválido', async () => {
        await wrapper.setData({ email: 'invalidemail', password: 'senha123' })
        await wrapper.vm.onSubmit()
        expect(wrapper.find('v-snackbar').text()).toContain('Network Error')
    })

    it('deve exibir uma mensagem de erro para o campo de email vazio', async () => {
        await wrapper.setData({ email: '', password: 'senha123' })
        await wrapper.vm.onSubmit()
        expect(wrapper.find('v-snackbar').text()).toContain('Network Error')
    })

    it('deve exibir uma mensagem de erro para o campo de senha vazio', async () => {
        await wrapper.setData({ email: 'teste@teste.com', password: '' })
        await wrapper.vm.onSubmit()
        expect(wrapper.find('v-snackbar').text()).toContain('Network Error')
    })

    it('deve exibir uma mensagem de erro para credenciais incorretas', async () => {
        await wrapper.setData({ email: 'teste@teste.com', password: 'incorrectpassword' })
        await wrapper.vm.onSubmit()
        expect(wrapper.find('v-snackbar').text()).toContain('Network Error')
    })
})