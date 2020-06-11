export default {
  updated() {
    if (this.$route.query.page) {
      // eslint-disable-next-line no-unused-vars
      window.scrollTo({
        top: this.$el.offsetTop,
        behavior: 'smooth'
      })
    }
  }
}
