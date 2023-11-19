import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Card from '@/components/Card.vue'

describe('Card', () => {
  it('renderizar a descrição e a prioridade do cartão corretamente', () => {
    const card = { description: 'Teste', priority: 'Alta' }
    const wrapper = mount(Card, {
      propsData: { card }
    })

    expect(wrapper.text()).toContain('Teste')
    expect(wrapper.text()).toContain('Alta')
  })
})
