<template>
  <div>
    <lv-profile-banner v-if="profile" :profile="profile" />
    <div class="container main-container">
      <section class="columns is-desktop">
        <div
          class="column is-8-widescreen is-offset-2-widescreen is-10-desktop is-offset-1-desktop"
        >
          <div class="tabs">
            <ul>
              <li :class="tabClass('articles')">
                <nuxt-link :to="authorData.authorRoute" class="is-capitalized">
                  {{ authorData.authorName }} articles
                </nuxt-link>
              </li>
              <li :class="tabClass('favorited')">
                <nuxt-link
                  :to="authorData.favoritesRoute"
                  class="is-capitalized"
                >
                  Favorited articles
                </nuxt-link>
              </li>
            </ul>
          </div>
          <NuxtChild />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LvProfileBanner from '@/components/ProfileBanner'
import authorData from '~/mixins/author-data'

export default {
  name: 'HomePage',
  components: {
    LvProfileBanner
  },
  mixins: [authorData],
  async fetch({ store, route, redirect }) {
    let userName = route.params.user

    // don't fetch profile if userName is wrong
    if (userName.length > 1) {
      userName = userName.slice(1, userName.length)
    }

    await store.dispatch('profile/fetchProfile', userName)
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isAuthenticated',
      loggedInUser: 'loggedInUser',
      profile: 'profile/profile'
    })
    // authorData:
    // author - from authorData
    // authorRoute - from authorData
    // favoritesRoute - from authorData
  },
  methods: {
    /**
     * Gets class for specified tab
     * @params {String} tabName - could be 'articles' or 'favorited'
     * @return {String} 'is-active'||''
     */
    tabClass(tabName) {
      const currentRoute = this.$route.name
      if (tabName === 'articles') {
        if (currentRoute === 'user-index') {
          return 'is-active'
        }
        return ''
      }

      if (tabName === 'favorited') {
        if (currentRoute === 'user-index-favorited') {
          return 'is-active'
        }
        return ''
      }

      return ''
    }
  }
}
</script>
