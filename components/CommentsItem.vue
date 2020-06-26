<template>
  <article class="media">
    <lv-profile-image
      :profile-image="comment.author.image"
      :profile-name="comment.author.username"
      :size-class="'is-48x48'"
      class="media-left"
    />
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.author.username }}</strong>
          <small>{{ comment.createdAt }}</small>
          <br />
          {{ comment.body }}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a
            v-if="belongsToUser"
            class="level-item"
            :disabled="isCommentDeleting"
            @click.prevent="deleteComment"
          >
            <span class="icon is-small">
              <fa :icon="['fas', 'trash']"></fa>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

import LvProfileImage from './ProfileImage'

export default {
  name: 'LvCommentsItem',
  components: {
    LvProfileImage
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isCommentDeleting: false
    }
  },
  computed: {
    belongsToUser() {
      return (
        this.isAuthenticated &&
        this.loggedInUser.username === this.comment.author.username
      )
    },
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async deleteComment() {
      this.isCommentDeleting = true
      await this.$store.dispatch('article/deleteComment', this.comment.id)
      this.isCommentDeleting = false
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/scss/variables"

a.level-item
  color: $link-as-text
  &[disabled]
    opacity: 0.5
    pointer-events: none
  &:hover
    color: $danger-light-invert
</style>
