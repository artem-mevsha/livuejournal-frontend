<template>
  <div>
    <lv-header />
    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>

<script>
import LvHeader from '../components/TheHeader.vue'

export default {
  components: {
    LvHeader
  }
}
</script>
