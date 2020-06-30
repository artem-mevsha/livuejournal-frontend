<template>
  <button
    :class="{
      'is-loading': isFavoriteUpdating,
      'is-light': !favorited,
      'is-primary': favorited
    }"
    class="button"
    @click.prevent="toggleFavorite"
  >
    <span class="icon is-small">
      <fa :icon="['fas', 'heart']"></fa>
    </span>
    <span v-if="iconOnly">{{ favoritesCount }}</span>
    <span v-else>{{ favoriteLabel }} ({{ favoritesCount }})</span>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LvArticleButtonFavorite',
  props: {
    slug: {
      type: String,
      required: true
    },
    favorited: {
      type: Boolean,
      default: false
    },
    favoritesCount: {
      type: Number,
      default: 0
    },
    iconOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFavoriteUpdating: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    favoriteLabel() {
      return `${this.favorited ? 'Unfavorite' : 'Favorite'} article`
    }
  },
  methods: {
    async toggleFavorite() {
      if (!this.isAuthenticated) {
        return this.$router.push('/auth/login')
      }

      const actionName = this.favorited
        ? 'article/unfavoriteArticle'
        : 'article/favoriteArticle'

      this.isFavoriteUpdating = true
      await this.$store.dispatch(actionName, this.slug)
      this.isFavoriteUpdating = false
    }
  }
}
</script>
