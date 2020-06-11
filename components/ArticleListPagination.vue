<template>
  <nav
    v-if="pages.length > 1"
    class="pagination"
    role="navigation"
    aria-label="pagination"
  >
    <template v-if="currentPage == 1">
      <span class="pagination-previous is-disabled">
        <fa :icon="['fas', 'chevron-left']"></fa>
      </span>
    </template>
    <template v-else>
      <nuxt-link
        :to="getPageRoute(+currentPage - 1)"
        class="pagination-previous"
      >
        <fa :icon="['fas', 'chevron-left']"></fa>
      </nuxt-link>
    </template>

    <template v-if="currentPage == lastPage">
      <span class="pagination-next is-disabled">
        <fa :icon="['fas', 'chevron-right']"></fa>
      </span>
    </template>
    <template v-else>
      <nuxt-link
        :to="getPageRoute(+currentPage + 1)"
        class="pagination-previous"
      >
        <fa :icon="['fas', 'chevron-right']"></fa>
      </nuxt-link>
    </template>

    <ul class="pagination-list">
      <li v-for="(page, index) in pages" :key="`page-${index}`">
        <template v-if="currentPage == page">
          <span class="pagination-link is-current" :aria-current="page">
            {{ page }}
          </span>
        </template>
        <template v-else-if="page === '...'">
          <span class="pagination-ellipsis">&hellip;</span>
        </template>
        <template v-else>
          <nuxt-link
            :to="getPageRoute(page)"
            :aria-label="`Goto page ${page}`"
            class="pagination-link"
          >
            {{ page }}
          </nuxt-link>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import paginationGenerator from '~/mixins/pagination-generator'

export default {
  name: 'LvArticleListPagination',
  mixins: [paginationGenerator],
  computed: {
    ...mapGetters({
      pagination: 'feed/pagination'
    }),
    currentPage() {
      return this.$route.query.page || 1
    },
    lastPage() {
      return Math.round(this.pagination.total / this.pagination.perPage)
    },
    pages() {
      return this.paginationGenerator(this.currentPage, this.lastPage, 2)
    }
  },
  methods: {
    getPageRoute(page) {
      return {
        name: this.$route.name,
        query: {
          ...this.$route.query,
          page
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.pagination
  padding: 2rem 0
</style>
