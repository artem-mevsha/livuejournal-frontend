// import { SnackbarProgrammatic as Snackbar } from 'buefy'

export const state = () => ({
  profile: {}
})

export const getters = {
  profile(state) {
    return state.profile
  }
}

export const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile
  }
}

export const actions = {
  async fetchProfile({ commit }, userName) {
    const response = await this.$axios.$get(`/profiles/${userName}`)
    commit('SET_PROFILE', response.profile)
  },

  async fetchProfileFollow({ commit }, userName) {
    const response = await this.$axios.$post(`/profiles/${userName}/follow`)
    commit('SET_PROFILE', response.profile)
  },

  async fetchProfileUnFollow({ commit }, userName) {
    const response = await this.$axios.$delete(`/profiles/${userName}/follow`)
    commit('SET_PROFILE', response.profile)
  }
}
