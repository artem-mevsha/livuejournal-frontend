<template>
  <button
    :class="{ 'is-loading': isFavoriteUpdating }"
    class="button is-primary-light"
    @click.prevent="toggleFavorite"
  >
    <span class="icon is-small">
      <fa :icon="['fas', 'heart']"></fa>
    </span>
    <span>{{ favoriteLabel }} ({{ favoritesCount }})</span>
  </button>
</template>

<script>
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
    }
  },
  data() {
    return {
      isFavoriteUpdating: false
    }
  },
  computed: {
    favoriteLabel() {
      return `${this.favorited ? 'Unfavorite' : 'Favorite'} article`
    }
  },
  methods: {
    async toggleFavorite() {
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
