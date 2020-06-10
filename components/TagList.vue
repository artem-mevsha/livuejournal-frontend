<template>
  <div>
    <h3 class="title">Popular tags</h3>
    <div v-if="tags.length" class="tags">
      <nuxt-link
        v-for="(tag, index) in tags"
        :key="index"
        :to="tagLink(tag)"
        :class="tagClass(tag)"
        class="tag"
      >
        {{ tag }}
        <button v-if="isTagActive(tag)" class="delete is-small"></button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LvTagList',
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredTag() {
      return this.$route.query.tag
    }
  },
  methods: {
    isTagActive(tag) {
      return tag === this.filteredTag
    },
    tagClass(tag) {
      return this.isTagActive(tag) ? 'is-primary' : 'is-primary-light'
    },
    tagLink(tag) {
      return this.isTagActive(tag) ? '/' : `/?tag=${tag}`
    }
  }
}
</script>

<style lang="sass">
@import "~assets/scss/variables"

.tags
  .tag
    transition: all .3s ease
    &:hover
      background: $primary
      color: $primary-invert
      text-decoration: none
</style>
