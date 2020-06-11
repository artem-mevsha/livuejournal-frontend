import { SnackbarProgrammatic as Snackbar } from 'buefy'

export const state = () => ({
  articles: [],
  articlesCount: 0,
  type: 'global',
  tags: [],
  filters: {
    offset: 0,
    limit: 10
  },
  isLoading: false
})

export const getters = {
  articles(state) {
    return state.articles
  },
  tags(state) {
    return state.tags
  },
  type(state) {
    return state.type
  },
  pagination(state) {
    return {
      total: state.articlesCount,
      perPage: state.filters.limit
    }
  }
}

export const mutations = {
  FETCH_START(state) {
    state.isLoading = true
  },
  FETCH_END(state, { articles, articlesCount, requestQuery }) {
    state.isLoading = false
    state.articles = articles
    state.articlesCount = articlesCount
    state.filters = requestQuery
  },
  SET_TAGS(state, tags) {
    state.tags = tags
  }
}

export const actions = {
  async fetchArticles({ commit, state }, query) {
    let fetchUrl = '/articles'
    if (query.userFeed) {
      fetchUrl = '/articles/feed'
    }
    try {
      const offset = state.filters.limit * (query.page - 1)
      const requestQuery = {
        offset: offset || 0,
        limit: state.filters.limit,
        tag: query.tag,
        author: query.author,
        favorited: query.favorited
      }
      const response = await this.$axios.$get(fetchUrl, {
        params: requestQuery
      })
      const { articles, articlesCount } = response
      commit('FETCH_END', { articles, articlesCount, requestQuery })
    } catch (e) {
      return Snackbar.open({
        message: 'Cannot get articles. Please, reload the page',
        type: 'is-danger'
      })
    }
  },

  async fetchTags({ commit }) {
    try {
      const response = await this.$axios.$get('/tags')
      commit('SET_TAGS', response.tags)
    } catch (e) {
      return Snackbar.open({
        message: 'Cannot get tags. Please, reload the page',
        type: 'is-danger'
      })
    }
  }
}
