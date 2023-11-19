import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'
import List from '@/components/List.vue';

describe('List', () => {
  it('renderização correta do componente', () => {
    const wrapper = shallowMount(List, {
      props: {
        tasks: [],
        previewMode: 'typeList',
        typeList: 'task',
        feature: 'TODO',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('.btn-positive-action').text()).toBe('Salvar');
    expect(wrapper.findAllComponents({ name: 'Nova Tarefa' }).length).toBe(0);
  });
});
