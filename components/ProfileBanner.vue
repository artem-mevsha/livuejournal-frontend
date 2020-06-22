<template>
  <section class="hero is-primary is-bold">
    <div class="hero-inner">
      <div class="container">
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <figure class="image is-64x64">
              <img :src="profile.image" class="is-rounded" />
            </figure>
            <h1 class="subtitle has-text-centered">{{ profile.username }}</h1>
            <div class="profile-bio has-text-centered">
              <p>{{ profile.bio }}</p>
            </div>
            <div v-if="isAuthenticated" class="has-text-right">
              <nuxt-link
                v-if="loggedInUser.username === profile.username"
                :to="`/@${loggedInUser.username}/settings`"
                class="button is-light"
              >
                Edit profile
              </nuxt-link>
              <lv-article-button-follow
                v-else
                :username="profile.username"
                :following="profile.following"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import LvArticleButtonFollow from './ArticleButtonFollow'

export default {
  name: 'LvProfileBanner',
  components: {
    LvArticleButtonFollow
  },
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isProfileUpdating: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>

<style lang="sass" scoped>
.hero-inner
  padding: 1rem

.image
  margin-left: auto
  margin-right: auto
  margin-bottom: 1rem
  border-radius: 50%
  background-color: #fff

.profile-bio
  margin-bottom: 1rem
</style>
