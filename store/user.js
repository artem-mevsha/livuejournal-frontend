import { getField, updateField } from 'vuex-map-fields'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export const state = () => ({
  errors: null,
  username: null,
  email: null,
  bio: null,
  image: null
})

export const getters = {
  getField
}

export const mutations = {
  updateField,

  SET_USER(state, userData) {
    state.email = userData.email
    state.username = userData.username
    state.image = userData.image
    state.bio = userData.bio
  },

  SET_ERRORS(state, errors) {
    state.errors = {
      ...errors
    }
  }
}

export const actions = {
  async getUser({ commit }) {
    commit('SET_ERRORS', null)
    try {
      const response = await this.$axios.$get('user')
      commit('SET_USER', {
        ...response.user
      })
      return
    } catch (e) {
      return Snackbar.open({
        message: 'Cannot get user info. Please, try again',
        type: 'is-danger'
      })
    }
  },

  async updateUser({ commit, state }, user) {
    if (state.errors) {
      commit('SET_ERRORS', null)
    }
    try {
      const response = await this.$axios.put('user', {
        user
      })

      const token = response.data.user.token
      await this.$auth.setUserToken(token)

      Snackbar.open({
        message: 'User info has been updated',
        type: 'is-primary'
      })
    } catch (e) {
      if (e.response) {
        if (e.response.data && e.response.data.errors) {
          return commit('SET_ERRORS', e.response.data.errors)
        }
      }

      return Snackbar.open({
        message: `Cannot update user. Error: ${e}`,
        type: 'is-danger'
      })
    }
  }
}
