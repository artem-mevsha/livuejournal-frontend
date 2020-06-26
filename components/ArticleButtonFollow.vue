<template>
  <button
    :class="{
      'is-loading': isProfileUpdating,
      'is-light': !following,
      'is-dark': following
    }"
    class="button"
    @click.prevent="updateFollow"
  >
    <span class="icon is-small">
      <fa :icon="['fas', `${followUserIcon}`]"></fa>
    </span>
    <span>{{ followUserLabel }}</span>
  </button>
</template>

<script>
export default {
  name: 'LvArticleButtonFollow',
  props: {
    username: {
      type: String,
      required: true
    },
    following: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isProfileUpdating: false
    }
  },
  computed: {
    followUserIcon() {
      return `${this.following ? 'minus' : 'plus'}`
    },
    followUserLabel() {
      return `${this.following ? 'Following' : 'Follow'} ${this.username}`
    }
  },
  methods: {
    async updateFollow() {
      const actionName = this.following
        ? 'profile/fetchProfileUnfollow'
        : 'profile/fetchProfileFollow'

      this.isProfileUpdating = true
      await this.$store.dispatch(actionName, this.username)
      this.isProfileUpdating = false
    }
  }
}
</script>
