<template>
  <div class="container main-container">
    <div class="columns is-desktop">
      <div
        class="column is-8-widescreen is-offset-2-widescreen is-10-desktop is-offset-1-desktop"
      >
        <div class="content article">
          <h1 class="title">{{ article.title }}</h1>
          <h4 v-if="article.description" class="subtitle">
            {{ article.description }}
          </h4>
          <lv-article-author
            class="article-meta"
            :slug="article.slug"
            :profile="profile"
            :favorited="article.favorited"
            :favorites-count="article.favoritesCount"
            :created-at="article.createdAt"
            :buttons-enabled="true"
          ></lv-article-author>
          <div class="article-body">
            <p>{{ article.body }}</p>
          </div>
          <lv-article-taglist
            v-if="article.tagList"
            :tags="article.tagList"
            class="article-tags"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LvArticleAuthor from '@/components/ArticleAuthor'
import LvArticleTaglist from '@/components/ArticleTaglist'

export default {
  name: 'ArticlesPage',
  components: {
    LvArticleAuthor,
    LvArticleTaglist
  },
  async fetch({ store, route }) {
    const slug = route.params.slug
    await store.dispatch('article/fetchArticle', slug)
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      article: 'article/article',
      comments: 'article/comments',
      profile: 'profile/profile'
    })
  },
  head: {
    title: `${process.env.title}`
  }
}
</script>

<style lang="sass" scoped>
.article-body
  margin: 1rem 0
</style>
