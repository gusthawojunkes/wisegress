import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Calendar from '../../views/Calendar.vue'

describe('Calendar', () => {
  it('carregar eventos quando montado', async () => {
    const wrapper = mount(Calendar)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.events).toHaveLength(0)
  })
})