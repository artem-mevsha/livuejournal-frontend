import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('date', (date) => {
  return format(new Date(date), 'MMMM d, yyyy')
})
