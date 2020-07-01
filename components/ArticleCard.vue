<template>
  <nuxt-link :to="`/articles/${article.slug}`" class="card is-horizontal box">
    <div v-if="hasCoverImage" class="card-image">
      <figure class="image is-square">
        <b-skeleton :animated="false"></b-skeleton>
        <cld-image
          :public-id="article.coverImage"
          width="640"
          height="640"
          crop="fill"
          :progressive="true"
        >
          <cld-transformation dpr="2.0" />
        </cld-image>
      </figure>
    </div>
    <div class="card-stacked">
      <div class="card-content">
        <lv-article-author
          :slug="article.slug"
          :profile="article.author"
          :favorited="article.favorited"
          :favorites-count="article.favoritesCount"
          :created-at="article.createdAt"
          class="article-meta"
        ></lv-article-author>

        <div class="content">
          <h3 class="title article-title is-4">{{ article.title }}</h3>
          <p>{{ article.description }}</p>
          <p class="is-size-7">Read more...</p>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import LvArticleAuthor from './ArticleAuthor'

export default {
  name: 'LvArticleCard',
  components: {
    LvArticleAuthor
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasCoverImage() {
      return this.article.coverImage
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~bulma/sass/utilities/initial-variables"
@import "~bulma/sass/utilities/mixins"
@import "~assets/scss/variables"
@import "~assets/scss/main"

+tablet
  .card
    &.is-horizontal
      display: flex
      .card-image
        width: 30%
        .b-skeleton
          @include bImageSkeleton
      .card-stacked
        width: 70%
        flex-direction: column
        flex: 1 1 auto
        display: flex
        position: relative
        .card-content
          flex-grow: 1

+desktop-only
  .card
    &.is-horizontal
      .card-image
        width: 43%
      .card-stacked
        width: 57%

.box
  transition: box-shadow .3s ease

.article-author
  transition: color .3s ease
  &:hover
    color: $primary

.article-title
  margin-bottom: 0.5rem
</style>
