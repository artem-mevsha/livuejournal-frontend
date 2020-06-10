<template>
  <div>
    <lv-banner v-if="!isLoggedIn" />
    <div class="container main-container">
      <section class="columns">
        <main class="column is-9">
          <div class="tabs">
            <ul>
              <li v-if="isLoggedIn">
                <nuxt-link to="/feed">My feed</nuxt-link>
              </li>
              <li :class="{ 'is-active': !filteredTag }">
                <nuxt-link to="/">Global feed</nuxt-link>
              </li>
              <li v-if="filteredTag" :class="{ 'is-active': filteredTag }">
                <nuxt-link :to="`/?tag=${filteredTag}`">
                  #{{ filteredTag }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <lv-article-list :articles="articles" />
        </main>
        <aside class="column is-3">
          <lv-tag-list :tags="tags" />
        </aside>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LvBanner from '../components/TheBanner'
import LvArticleList from '../components/ArticleList'
import LvTagList from '../components/TagList'

export default {
  name: 'HomePage',
  components: {
    LvBanner,
    LvArticleList,
    LvTagList
  },
  async fetch({ store, route }) {
    store.dispatch('feed/fetchTags')
    await store.dispatch('feed/fetchArticles', {
      userFeed: false,
      ...route.query
    })
  },
  computed: {
    ...mapGetters({
      articles: 'feed/articles',
      tags: 'feed/tags',
      feedType: 'feed/type',
      isLoggedIn: 'isAuthenticated'
    }),
    filteredTag() {
      return this.$route.query.tag
    }
  },
  watchQuery: true, // watch for query change. Ex ?tag=sometag || ?page=5
  methods: {
    isFeedActive(feedType) {
      return feedType === this.feedType
    }
  },
  head: {
    title: `LivueJournal`
  }
}
</script>
