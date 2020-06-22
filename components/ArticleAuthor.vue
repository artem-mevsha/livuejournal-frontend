<template>
  <div class="media">
    <div v-if="profile.image" class="media-left">
      <figure class="image" :class="imageSizeClass()">
        <img :src="profile.image" :alt="profile.name" />
      </figure>
    </div>
    <div class="media-content">
      <nuxt-link
        :to="`/@${profile.username}`"
        class="title is-6 is-block article-author"
      >
        {{ profile.username }}
      </nuxt-link>
      <p class="subtitle is-7">
        <time :datetime="createdAt">
          {{ createdAt }}
        </time>
      </p>
    </div>
    <div v-if="buttonsEnabled" class="media-right">
      <div class="buttons are-small">
        <lv-article-button-follow
          :username="profile.username"
          :following="profile.following"
        />
        <lv-article-button-favorite
          :slug="slug"
          :favorited="favorited"
          :favorites-count="favoritesCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LvArticleButtonFollow from './ArticleButtonFollow'
import LvArticleButtonFavorite from './ArticleButtonFavorite'

export default {
  name: 'LvArticleAuthor',
  components: {
    LvArticleButtonFollow,
    LvArticleButtonFavorite
  },
  props: {
    slug: {
      type: String,
      required: true
    },
    profile: {
      type: Object,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    imageSize: {
      type: String,
      default: 'small'
    },
    buttonsEnabled: {
      type: Boolean,
      default: false
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
  methods: {
    imageSizeClass() {
      if (this.imageSize === 'medium') {
        return 'is-48x48'
      }
      return 'is-32x32'
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/initial-variables.sass";
@import "~bulma/sass/utilities/mixins.sass";

.media
  margin-bottom: 2rem

.image
  margin-left: 0
  margin-right: 0

+mobile
  .media
    flex-wrap: wrap
  .media-right
    margin-left: 0
    margin-top: .5rem
</style>
