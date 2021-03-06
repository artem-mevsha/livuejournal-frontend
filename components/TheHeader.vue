<template>
  <b-navbar class="is-spaced">
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" :to="homePath" class="logo is-size-5">
        <span>Livue</span>
        <span class="has-text-primary">Journal</span>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        v-for="(navItem, index) in navMain"
        :key="index"
        :to="navItem.to"
        tag="nuxt-link"
      >
        {{ navItem.title }}
      </b-navbar-item>
    </template>

    <template slot="end">
      <template v-if="isAuthenticated && loggedInUser">
        <b-navbar-item tag="nuxt-link" :to="{ path: '/editor' }">
          New article
        </b-navbar-item>
        <b-navbar-dropdown :label="loggedInUser.username">
          <b-navbar-item :to="getProfileUrl('user')" tag="nuxt-link">
            My profile
          </b-navbar-item>
          <b-navbar-item :to="getProfileUrl('settings')" tag="nuxt-link">
            Settings
          </b-navbar-item>
          <b-navbar-item @click.prevent="logout">
            Logout
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template v-else>
        <b-navbar-item
          v-for="(authButton, index) in authButtons"
          :key="index"
          tag="div"
        >
          <nuxt-link
            class="button"
            :class="authButton.class"
            :to="authButton.to"
          >
            {{ authButton.title }}
          </nuxt-link>
        </b-navbar-item>
      </template>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      navMain: [
        {
          title: 'Home',
          to: '/'
        },
        {
          title: 'About',
          to: '/about'
        }
      ],
      authButtons: [
        {
          title: 'Sign up',
          to: '/auth/signup',
          class: 'is-primary'
        },
        {
          title: 'Log in',
          to: '/auth/login',
          class: 'is-light'
        }
      ]
    }
  },
  computed: {
    homePath() {
      return this.isAuthenticated ? '/feed' : '/'
    },
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    /**
     * @param {String} pageName - 'user' for profile page, 'settings' for settings page
     * @return {String} - route path
     */
    getProfileUrl(pageName = 'user') {
      if (this.isAuthenticated) {
        const { username } = this.loggedInUser
        if (pageName === 'settings') {
          return `/@${username}/settings`
        }
        return `/@${username}`
      }
      return '/'
    },
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="sass">
// navbar-menu need to be fixed, so css is not scoped

@import "~bulma/sass/utilities/initial-variables"
@import "~bulma/sass/utilities/mixins"

.logo
  font-weight: 600

+tablet-only
  .navbar-menu
    box-shadow: none
    padding: 0
</style>
