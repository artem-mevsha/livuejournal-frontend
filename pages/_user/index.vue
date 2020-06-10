<template>
  <h1 class="title">Welcome here</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  page: {
    title: `LivueJournal`
  }
}
</script>
