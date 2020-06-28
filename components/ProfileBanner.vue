<template>
  <section class="hero is-primary is-bold">
    <div class="hero-inner">
      <div class="container">
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <lv-profile-image
              :profile-image="profile.image"
              :profile-name="profile.username"
              :size-class="'is-128x128'"
              class="author-image"
            />
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
                <span class="icon is-small">
                  <fa :icon="['fas', 'edit']"></fa>
                </span>
                <span>Edit profile</span>
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

import LvProfileImage from './ProfileImage'
import LvArticleButtonFollow from './ArticleButtonFollow'

export default {
  name: 'LvProfileBanner',
  components: {
    LvProfileImage,
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

.author-image
  margin-left: auto
  margin-right: auto
  margin-bottom: 1rem
  border-radius: 50%

.profile-bio
  margin: 0 auto 1rem
  max-width: 600px
</style>
