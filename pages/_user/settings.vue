<template>
  <div class="container main-container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h1 class="title has-text-centered">Your settings</h1>

        <lv-errors v-if="errors" :errors="errors" />

        <form novalidate @submit.prevent="updateUser">
          <b-field label="Your avatar">
            <lv-image-upload
              :image-model="image"
              image-tag="avatar"
              @change="onImageChange"
              @delete="onImageDelete"
            />
          </b-field>
          <b-field label="Your name">
            <b-input
              v-model.lazy="username"
              type="text"
              :disabled="isLoading"
            ></b-input>
          </b-field>
          <b-field label="Short bio about you">
            <b-input
              v-model.lazy="bio"
              type="textarea"
              maxlength="400"
              :disabled="isLoading"
            ></b-input>
          </b-field>
          <b-field label="Your email">
            <b-input
              v-model.lazy="email"
              type="email"
              :disabled="isLoading"
            ></b-input>
          </b-field>
          <b-field label="Password">
            <b-input
              v-model.lazy="password"
              type="password"
              :disabled="isLoading"
            ></b-input>
          </b-field>
          <div class="buttons">
            <button
              class="button is-primary"
              type="submit"
              :disabled="isLoading"
            >
              Update
            </button>
            <button
              class="button is-danger is-outlined"
              type="button"
              :disabled="isLoading"
              @click="logout"
            >
              Log out
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

import LvErrors from '@/components/BaseErrors'
import LvImageUpload from '@/components/ImageUpload'

export default {
  name: 'SettingsPage',
  components: {
    LvErrors,
    LvImageUpload
  },
  middleware: ['auth', 'belongs-to-user'],
  async fetch({ store }) {
    await store.dispatch('user/getUser')
  },
  data() {
    return {
      isLoading: false,
      password: '',
      imageFile: null
    }
  },
  computed: {
    ...mapFields('user', ['username', 'email', 'bio', 'image', 'errors'])
  },
  methods: {
    logout() {
      this.$auth.logout()
    },

    async updateUser() {
      this.isLoading = true
      await this.$store.dispatch('user/updateUser', {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        password: this.password || undefined
      })
      this.isLoading = false
    },

    onImageChange(fileResponse) {
      this.$store.dispatch('user/updateUserImage', fileResponse.public_id)
    },

    onImageDelete() {
      this.$store.dispatch('user/updateUserImage', null)
    }
  },
  page: {
    title: `Settings - ${process.env.title}`
  }
}
</script>

<style lang="sass" scoped>
.buttons
  margin-top: 1.5rem
  justify-content: space-between
</style>
