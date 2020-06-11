<template>
  <main class="main-app">
    <lv-header />
    <section class="main-content">
      <nuxt />
    </section>
    <lv-footer class="footer" />
  </main>
</template>

<script>
import LvHeader from '../components/TheHeader.vue'
import LvFooter from '../components/TheFooter.vue'

export default {
  components: {
    LvHeader,
    LvFooter
  }
}
</script>

<style lang="sass">
html, body, #__nuxt, #__layout, .main-app
  min-height: 100vh

.main-app
  display: flex
  flex-direction: column

.main-content
  flex: 1 0 auto

.footer
  flex-shrink: 0
</style>
