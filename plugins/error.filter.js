import Vue from 'vue'

Vue.filter('errorFilter', (errorValue) => {
  if (typeof errorValue === 'object') {
    return errorValue[0]
  }
  return errorValue
})
