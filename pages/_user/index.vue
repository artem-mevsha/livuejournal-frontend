<template>
  <div>
    <lv-profile-banner />
    <div class="container main-container">
      <section class="columns">
        <div class="column is-10 is-offset-1">
          <div class="tabs">
            <ul>
              <li :class="tabClass('articles')">
                <nuxt-link :to="authorData.authorRoute">
                  {{ authorData.authorName }} articles
                </nuxt-link>
              </li>
              <li :class="tabClass('favorited')">
                <nuxt-link :to="authorData.favoritesRoute">
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
  mixins: [authorData],
  components: {
    LvProfileBanner
  },
  async fetch({ store, route }) {},
  computed: {
    ...mapGetters({
      isLoggedIn: 'isAuthenticated',
      loggedInUser: 'loggedInUser'
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
