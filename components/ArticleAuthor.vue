<template>
  <div class="media">
    <div class="media-left">
      <nuxt-link :to="`/@${profile.username}`">
        <lv-profile-image
          :profile-image="profile.image"
          :profile-name="profile.username"
          :size-class="'is-32x32'"
          class="author-image"
        />
      </nuxt-link>
    </div>
    <div class="media-content">
      <nuxt-link :to="`/@${profile.username}`" class="author-link">
        <h5 class="title is-6 is-block article-author">
          {{ profile.username }}
        </h5>
        <p v-if="createdAt" class="subtitle is-7">
          <time :datetime="createdAt">
            {{ createdAt | date }}
          </time>
        </p>
      </nuxt-link>
    </div>
    <div v-if="buttonsEnabled && isAuthenticated" class="media-right">
      <div
        v-if="loggedInUser.username === profile.username"
        class="buttons are-small"
      >
        <nuxt-link :to="`/editor/${slug}`" class="button is-light">
          <span class="icon is-small">
            <fa :icon="['fas', 'edit']"></fa>
          </span>
          <span>Edit article</span>
        </nuxt-link>
        <lv-article-button-delete :v-if="slug.length" :slug="slug" />
      </div>
      <div v-else class="buttons are-small">
        <lv-article-button-follow
          :username="profile.username"
          :following="profile.following"
        />
        <lv-article-button-favorite
          :v-if="slug.length"
          :slug="slug"
          :favorited="favorited"
          :favorites-count="favoritesCount"
          :icon-only="false"
        />
      </div>
    </div>
    <div v-else class="media-right">
      <div class="buttons are-small">
        <lv-article-button-favorite
          :v-if="slug.length"
          :slug="slug"
          :favorited="favorited"
          :favorites-count="favoritesCount"
          :icon-only="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LvProfileImage from './ProfileImage'
import LvArticleButtonFollow from './ArticleButtonFollow'
import LvArticleButtonFavorite from './ArticleButtonFavorite'
import LvArticleButtonDelete from './ArticleButtonDelete'

export default {
  name: 'LvArticleAuthor',
  components: {
    LvProfileImage,
    LvArticleButtonFollow,
    LvArticleButtonFavorite,
    LvArticleButtonDelete
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
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/initial-variables"
@import "~bulma/sass/utilities/mixins"
@import "~assets/scss/variables"

.media
  margin-bottom: 2rem

.author-image
  margin-left: 0
  margin-right: 0
  border-radius: 5px

.author-link
  .title,
  .subtitle
    color: $link-as-text
  &:hover
    .title,
    .subtitle
      color: $link


+mobile
  .media
    flex-wrap: wrap
  .media-right
    margin-left: 0
    margin-top: .5rem
</style>
