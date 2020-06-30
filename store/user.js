import { getField, updateField } from 'vuex-map-fields'
import { ToastProgrammatic as Toast } from 'buefy'

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
    const { email, username, image, bio } = userData
    state.email = email
    state.username = username
    state.image = image
    state.bio = bio
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
      Toast.open({
        message: 'Cannot get user info. Please, try again',
        type: 'is-danger'
      })
      throw e
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

      commit('SET_USER', {
        ...response.data.user
      })

      const token = response.data.user.token
      await this.$auth.setUserToken(token)

      Toast.open('User info has been updated')
    } catch (e) {
      if (e.response) {
        if (e.response.data && e.response.data.errors) {
          return commit('SET_ERRORS', e.response.data.errors)
        }
      }

      return Toast.open({
        message: `Cannot update user. Error: ${e}`,
        type: 'is-danger'
      })
    }
  },

  updateUserImage({ commit, state }, image = null) {
    const { email, username, bio } = state
    commit('SET_USER', {
      username,
      email,
      bio,
      image
    })
  }
}
