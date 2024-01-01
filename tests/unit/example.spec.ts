import { mount } from '@vue/test-utils'
import IntroPage from '@/views/HOM/HOM1000.vue'

describe('IntroPage.vue', () => {
  it('renders home vue', () => {
    const wrapper = mount(IntroPage)
    expect(wrapper.text()).toMatch('Ready to create an app?')
  })
})
