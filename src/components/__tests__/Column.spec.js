import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'
import Column from '@/components/Column.vue';

describe('Column', () => {
  it('renderizar corretamente', () => {
    const wrapper = shallowMount(Column, {
      props: {
        title: 'Teste de Título',
        tasks: [],
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
  
  it('receber e exibe o título', () => {
    const title = 'Teste de Título';
    const wrapper = shallowMount(Column, {
      props: {
        title,
        tasks: [],
      },
    });

    expect(wrapper.find('v-card-title').text()).toBe(title);
  });

  it('executar o evento updateList quando o componente List é atualizado', () => {
    const wrapper = shallowMount(Column, {
      props: {
        title: 'Teste de Título',
        tasks: [],
      },
    });

    wrapper.vm.updateList('updatedList');

    expect(wrapper.emitted().updateList[0]).toEqual(['updatedList']);
  });
});