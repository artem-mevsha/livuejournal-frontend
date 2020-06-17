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
              <button
                v-else-if="!profile.following"
                :class="{ 'is-loading': isProfileUpdating }"
                class="button is-light"
                @click.prevent="updateFollow(true)"
              >
                <span class="icon is-small">
                  <fa :icon="['fas', 'plus']"></fa>
                </span>
                <span>Follow {{ profile.username }}</span>
              </button>
              <button
                v-else-if="profile.following"
                :class="{ 'is-loading': isProfileUpdating }"
                class="button is-light"
                @click.prevent="updateFollow(false)"
              >
                <span class="icon is-small">
                  <fa :icon="['fas', 'minus']"></fa>
                </span>
                <span>Unfollow {{ profile.username }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LvProfileBanner',
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
  },
  methods: {
    async updateFollow(shouldFollow) {
      const userName = this.profile.username
      const actionName = shouldFollow
        ? 'profile/fetchProfileFollow'
        : 'profile/fetchProfileUnFollow'

      this.isProfileUpdating = true
      await this.$store.dispatch(actionName, userName)
      this.isProfileUpdating = false
    }
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
