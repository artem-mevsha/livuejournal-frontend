import { ToastProgrammatic as Toast } from 'buefy'

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
  },
  UPDATE_ARTICLE_IN_LIST(state, data) {
    // mutation is used only for favorite/unfavotire action
    state.articles = state.articles.map((article) => {
      if (article.slug !== data.slug) {
        return article
      }
      // Change only favorited and favoritesCount props in state
      article.favorited = data.favorited
      article.favoritesCount = data.favoritesCount
      return article
    })
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
      Toast.open({
        message: 'Cannot get articles. Please, reload the page',
        type: 'is-danger'
      })
      throw e
    }
  },

  async fetchTags({ commit }) {
    try {
      const response = await this.$axios.$get('/tags')
      commit('SET_TAGS', response.tags)
    } catch (e) {
      Toast.open({
        message: `Cannot get tags. ${e}`,
        type: 'is-danger'
      })
      throw e
    }
  }
}
