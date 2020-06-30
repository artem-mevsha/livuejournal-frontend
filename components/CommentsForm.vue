<template>
  <article class="media">
    <lv-profile-image
      :profile-image="loggedInUser.image"
      :profile-name="loggedInUser.username"
      :size-class="'is-48x48'"
      class="media-left"
    />
    <div class="media-content">
      <form @submit.prevent="onSubmit">
        <b-field>
          <b-input
            v-model.lazy="commentText"
            type="textarea"
            maxlength="400"
            placeholder="Add a comment..."
            :disabled="isLoading"
          ></b-input>
        </b-field>
        <nav class="level">
          <div class="level-left">
            <b-button
              type="is-light"
              native-type="submit"
              class="level-item"
              :disabled="isLoading"
            >
              Comment
            </b-button>
          </div>
        </nav>
      </form>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

import LvProfileImage from './ProfileImage'

export default {
  name: 'LvCommentsForm',
  components: {
    LvProfileImage
  },
  data() {
    return {
      commentText: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      try {
        await this.$store.dispatch('article/createComment', this.commentText)
        this.commentText = ''
      } catch (e) {
        this.$buefy.toast.open({
          message: `Cannot comment this story. ${e}`,
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
