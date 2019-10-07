import { mount } from '@vue/test-utils'
import CityCard from '@/components/CityCard.vue'

describe('CityCard', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(CityCard)
    wrapper.props.details = {
      measurements: []
    }
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
