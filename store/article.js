import { getField, updateField } from 'vuex-map-fields'

const initialState = {
  errors: null,
  article: {},
  comments: []
}

export const state = () => ({
  ...initialState
})

export const getters = {
  getField,
  article(state) {
    return state.article
  },
  comments(state) {
    return state.comments
  },
  errors(state) {
    return state.errors
  }
}

export const mutations = {
  updateField,
  SET_ARTICLE(state, article) {
    state.article = article
  },
  SET_COMMENTS(state, comments) {
    state.comments = comments
  },
  SET_ERRORS(state, errors) {
    state.errors = {
      ...errors
    }
  }
}

export const actions = {
  async fetchArticle({ commit }, slug) {
    const response = await this.$axios.$get(`/articles/${slug}`)
    commit('SET_ARTICLE', response.article)
    commit('profile/SET_PROFILE', response.article.author, { root: true })
  },

  fetchComments() {},

  async saveArticle({ commit, state, dispatch }, slug) {
    if (state.errors) {
      commit('SET_ERRORS', null)
    }
    commit('SET_ARTICLE', state.article)

    try {
      let response

      if (slug) {
        // edit existing article
        response = await this.$axios.put(`/articles/${slug}`, {
          article: {
            title: state.article.title,
            description: state.article.description,
            body: state.article.body
          }
        })
      } else {
        // create new article
        response = await this.$axios.post('/articles', {
          article: {
            ...state.article
          }
        })
      }

      dispatch('clearArticle')

      return response
    } catch (e) {
      if (e.response) {
        if (e.response.data && e.response.data.errors) {
          commit('SET_ERRORS', e.response.data.errors)
        }
      }
      throw e
    }
  },

  clearArticle({ commit }) {
    commit('SET_ARTICLE', {
      title: '',
      description: '',
      body: '',
      bodyHTML: '',
      tagList: []
    })
  },

  async deleteArticle({ dispatch }, slug) {
    await this.$axios.$delete(`/articles/${slug}`)
    dispatch('clearArticle')
  },

  async favoriteArticle({ commit }, slug) {
    const response = await this.$axios.$post(`/articles/${slug}/favorite`)
    commit('SET_ARTICLE', response.article)
  },

  async unfavoriteArticle({ commit }, slug) {
    const response = await this.$axios.$delete(`/articles/${slug}/favorite`)
    commit('SET_ARTICLE', response.article)
  }
}
