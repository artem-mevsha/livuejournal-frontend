<template>
  <div
    class="has-text-centered is-size-3 has-text-primary"
    style="margin-top:4em;"
  >
    <h1 v-if="error.statusCode === 404">Oups, page not found</h1>
    <h1 v-else>Oups, an error occurred</h1>
    <br />
    <nuxt-link to="/" class="is-size-5 has-text-black">
      Go to Home page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  layout: 'default'
}
</script>
