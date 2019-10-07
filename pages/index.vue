<template>
  <div>
    <div class="page-text">
      <h1>Compare your Air</h1>
      <p>Compare the air quality between cities in the UK.</p>
      <p>Select the cities to compare using the search tool below</p>
    </div>
    <!-- Employed a similar component structure to my angular project using the following info: https://vuejs.org/v2/guide/components.html -->
    <SelectBox :options="options" v-on:selected-city="select($event)" />
    <div class="card-container">
      <CityCard :details="city" :key="city" v-for="(city, index) in selected" v-on:clear="clear(index)" />
    </div>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>
<script>
import SelectBox from '~/components/SelectBox.vue'
import CityCard from '~/components/CityCard.vue'

export default {
  components: {
    SelectBox,
    CityCard
  },
  // Nuxt documentation recommends that async data is processed at page level: https://nuxtjs.org/guide/views/
  methods: {
    select(cityName) {
      this.$store.dispatch('getDetail', { city: cityName })
    },
    clear(index) {
      this.$store.dispatch('remove', { index: index })
    }
  },
  data() {
    return {
      options: this.$store.state.options.map(x => x.name),
      selected: this.$store.state.selected
    }
  }
}
</script>

<style>
.page-text {
  color: #fff;
  padding: 24px;
}
.card-container {
    padding-top: 175px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
