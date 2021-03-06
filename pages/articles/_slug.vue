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
          <div v-if="hasCoverImage" class="cover-image">
            <figure class="image is-16by9">
              <b-skeleton :animated="false"></b-skeleton>
              <cld-image
                :public-id="article.coverImage"
                width="900"
                height="540"
                crop="fill"
                :progressive="true"
              >
                <cld-transformation dpr="2.0" />
              </cld-image>
            </figure>
          </div>
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
            <vue-markdown>{{ article.body }}</vue-markdown>
          </div>
          <lv-article-taglist
            v-if="article.tagList"
            :tags="article.tagList"
            class="article-tags"
          />
        </div>
        <lv-comments :slug="article.slug" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueMarkdown from 'vue-markdown'

import LvArticleAuthor from '@/components/ArticleAuthor'
import LvArticleTaglist from '@/components/ArticleTaglist'
import LvComments from '@/components/Comments'

export default {
  name: 'ArticlesPage',
  components: {
    VueMarkdown,
    LvArticleAuthor,
    LvArticleTaglist,
    LvComments
  },
  async fetch({ store, route }) {
    const slug = route.params.slug
    await store.dispatch('article/fetchArticle', slug)
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      article: 'article/article',
      profile: 'profile/profile'
    }),
    hasCoverImage() {
      return this.article.coverImage
    }
  },
  head() {
    return {
      title: `${this.article.title} - ${process.env.title}`
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/scss/main"

.cover-image
  margin: 2rem auto
  .b-skeleton
    @include bImageSkeleton
  .image
    margin-left: 0
    margin-right: 0

.article-body
  margin: 1rem 0
</style>
