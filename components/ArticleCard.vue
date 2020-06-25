<template>
  <nuxt-link :to="`/articles/${article.slug}`" class="card box">
    <div class="card-content">
      <lv-article-author
        :profile="article.author"
        :created-at="article.createdAt"
        class="article-meta"
      ></lv-article-author>

      <div class="content">
        <h3 class="title article-title is-4">{{ article.title }}</h3>
        <p>{{ article.description }}</p>
        <p class="is-size-7">Read more...</p>
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
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/scss/variables"
.box
  transition: box-shadow .3s ease

.article-author
  transition: color .3s ease
  &:hover
    color: $primary

.article-title
  margin-bottom: 0.5rem
</style>
