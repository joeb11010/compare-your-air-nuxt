<template>
  <div id="select">
    <el-select filterable autocomplete @change="$emit('selected-city', $event)" v-model="value" placeholder="Enter city name...">
      <el-option v-for="option in options" :key="option" :label="option" :value="option"></el-option>
    </el-select>
<!-- Based this on Element docs: https://element.eleme.io/#/en-US/component/select#select -->
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'SelectBox',
  props: {
      options: {
          default() {
              return [];
          }
      }
  },
  data() {
    return {
      value: null
    }
  }
}
</script>