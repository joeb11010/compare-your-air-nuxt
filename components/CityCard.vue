<template>
  <el-card>
    <div class="bold label text-padding">
      <span>UPDATED {{ details.measurements[0].lastUpdated | prettyTime }} AGO</span>
      <el-button class="close-button" v-on:click="$emit('clear')" type="text" icon="el-icon-close" round></el-button>
    </div>
    <div class="card-header text-padding">{{details.location}}</div>
    <div class="text-padding">in {{details.city}}, {{country}}</div>
    <div class="bold text-padding">
      Values:
      <span v-bind:key="param" v-for="(param, index) in details.measurements">
        {{param.parameter | capitalize }}: {{param.value}}<span v-if="index !== details.measurements.length - 1 ">,</span>
      </span>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'CityCard',
  props: {
    details: {}
  },
  filters: {
    // Found this solution when looking for upper case filter, thought I'd experiment and use it to make the date readable with prettyTime: https://vuejs.org/v2/guide/filters.html
    capitalize: function(value) {
      if (!value) return ''
      return value.toUpperCase()
    },
    prettyTime: function(recordedDate) {
      const diffMins = Math.abs(
        (new Date().getTime() - new Date(recordedDate).getTime()) / 60000
      )
      const updated = getPeriodType(diffMins)
      const plural = updated.diff > 1 ? 'S' : ''
      return `${updated.diff} ${updated.period}${plural}`
    }
  },
  data() {
    return {
      country: 'United Kingdom'
    }
  }
}

function getPeriodType(minuteDiff) {
  if (minuteDiff < 60) {
    return { diff: Math.ceil(minuteDiff), period: 'MINUTE' }
  }
  const diffHours = minuteDiff / 60
  if (diffHours < 24) {
    return { diff: Math.ceil(diffHours), period: 'HOUR' }
  }
  const diffDays = diffHours / 24
  if (diffDays < 14) {
    return { diff: Math.ceil(diffDays), period: 'DAY' }
  }
  const diffWeeks = diffDays / 7
  if (diffWeeks < 8) {
    return { diff: Math.ceil(diffWeeks), period: 'WEEK' }
  }
  const diffMonths = diffWeeks / 4
  return { diff: Math.ceil(diffMonths), period: 'MONTH' }
}
</script>
<style>
.el-button.is-round {
    padding: 0;
}
.el-card {
    text-align: left;
    width: 360px;
    margin: 12px;
}
.close-button {
    float: right;
    padding: 3px 0
}
.bold {
    font-weight: 600;
}

.label {
    font-size: 12px;
}
.text-padding {
  padding: 3px;
}
.card-header {
    color: #6945A5;
    font-size: 20px;
    font-weight: 600;
}
</style>