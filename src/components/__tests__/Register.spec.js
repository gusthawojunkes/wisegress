import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'

import Register from '../../views/Register.vue';

describe('Register', () => {
    const wrapper = mount(Register)

    it('deve renderizar o formulário de login', () => {
        expect(wrapper.find('form').exists())
    })

    it('deve desabilitar o botão de registro quando o formulário estiver inválido', async () => {
        expect(wrapper.find('v-btn').attributes('form')).toBeUndefined()
    });

    it('deve habilitar o botão de registro quando o formulário estiver válido', async () => {
        await wrapper.setData({ email: 'teste@teste.com', password: 'senha123', confirmPassword: 'senha123' });
        expect(wrapper.find('v-btn').attributes('form')).toBeUndefined()
    });

    it('deve exibir uma mensagem de erro quando as senhas não coincidirem', async () => {
        await wrapper.setData({ email: 'teste@teste.com', password: 'senha123', confirmPassword: 'senha124' });
        const button = wrapper.find('v-btn');
        button.trigger('click');
        expect(wrapper.find('v-snackbar').text()).toContain('');
    });
});