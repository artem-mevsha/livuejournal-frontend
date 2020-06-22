const initialState = {
  article: {},
  comments: []
}

export const state = () => ({
  ...initialState
})

export const getters = {
  article(state) {
    return state.article
  },
  comments(state) {
    return state.comments
  }
}

export const mutations = {
  SET_ARTICLE(state, article) {
    state.article = article
  },
  SET_COMMENTS(state, comments) {
    state.comments = comments
  }
}

export const actions = {
  async fetchArticle({ commit }, slug) {
    const response = await this.$axios.$get(`/articles/${slug}`)
    commit('SET_ARTICLE', response.article)
    commit('profile/SET_PROFILE', response.article.author, { root: true })
  },
  fetchComments() {},
  async favoriteArticle({ commit }, slug) {
    const response = await this.$axios.$post(`/articles/${slug}/favorite`)
    commit('SET_ARTICLE', response.article)
  },
  async unfavoriteArticle({ commit }, slug) {
    const response = await this.$axios.$delete(`/articles/${slug}/favorite`)
    commit('SET_ARTICLE', response.article)
  }
}
