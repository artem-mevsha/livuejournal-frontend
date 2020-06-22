<template>
  <lv-article-list :articles="articles" />
</template>

<script>
import { mapGetters } from 'vuex'

import LvArticleList from '@/components/ArticleList'
import authorData from '~/mixins/author-data'

export default {
  name: 'HomePage',
  components: {
    LvArticleList
  },
  mixins: [authorData],
  async fetch({ store, route }) {
    const authorId = route.params.user
    const author = authorId.slice(1, authorId.length)
    await store.dispatch('feed/fetchArticles', {
      author,
      ...route.query
    })
  },
  computed: {
    ...mapGetters({
      articles: 'feed/articles',
      isLoggedIn: 'isAuthenticated',
      loggedInUser: 'loggedInUser'
    })
    // authorData:
    // authorName - from authorData
    // authorRoute - from authorData
    // favoritesRoute - from authorData
  },
  watchQuery: true, // watch for query change. Ex ?tag=sometag || ?page=5
  head() {
    return {
      title: `${this.authorData.authorName} profile - ${process.env.title}`
    }
  }
}
</script>
