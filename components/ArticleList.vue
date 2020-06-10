<template>
  <div>
    <section v-if="articles.length" class="articles-list">
      <lv-article-card
        v-for="article in articles"
        :key="article.slug"
        :article="article"
      />
    </section>
    <lv-article-list-pagination />
  </div>
</template>

<script>
import LvArticleCard from './ArticleCard'
import LvArticleListPagination from './ArticleListPagination'

export default {
  name: 'LvArticleList',
  components: {
    LvArticleCard,
    LvArticleListPagination
  },
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
}
</script>
