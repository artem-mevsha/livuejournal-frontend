<template>
  <div>
    <div class="container main-container">
      <section class="columns">
        <div class="column is-9">
          <div class="tabs">
            <ul>
              <li class="is-active">
                <nuxt-link to="/feed">My feed</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">Global feed</nuxt-link>
              </li>
            </ul>
          </div>
          <lv-article-list :articles="articles" />
        </div>
        <aside class="column is-3">
          <lv-tag-list :tags="tags" />
        </aside>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LvArticleList from '../components/ArticleList'
import LvTagList from '../components/TagList'

import paginationScroll from '~/mixins/pagination-scroll'

export default {
  name: 'HomePage',
  components: {
    LvArticleList,
    LvTagList
  },
  mixins: [paginationScroll],
  middleware: ['auth'],
  async fetch({ store, route }) {
    store.dispatch('feed/fetchTags')
    await store.dispatch('feed/fetchArticles', {
      userFeed: true,
      ...route.query
    })
  },
  computed: {
    ...mapGetters({
      articles: 'feed/articles',
      tags: 'feed/tags',
      feedType: 'feed/type'
    })
  },
  head: {
    title: 'My feed - LivueJournal'
  }
}
</script>
