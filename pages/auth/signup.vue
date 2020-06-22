<template>
  <div class="container main-container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h1 class="title has-text-centered">Sign up</h1>
        <h3 class="subtitle has-text-centered">
          <nuxt-link to="/auth/login">Have an account?</nuxt-link>
        </h3>

        <lv-errors v-if="errors" :errors="errors" />

        <form novalidate @submit.prevent="onSubmit">
          <b-field label="Username">
            <b-input
              v-model="username"
              type="text"
              :disabled="isLoading"
            ></b-input>
          </b-field>
          <b-field label="Email">
            <b-input
              v-model="email"
              type="email"
              :disabled="isLoading"
            ></b-input>
          </b-field>
          <b-field label="Password">
            <b-input
              v-model="password"
              type="password"
              :disabled="isLoading"
            ></b-input>
          </b-field>
          <div class="buttons">
            <b-button
              type="is-primary"
              native-type="submit"
              :disabled="isLoading"
            >
              Sign up
            </b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LvErrors from '@/components/BaseErrors'

export default {
  name: 'RegisterPage',
  middleware: ['guest'],
  components: {
    LvErrors
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errors: null,
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      this.errors = null

      try {
        const { username, email, password } = this
        const response = await this.$axios.post('users', {
          user: {
            username,
            email,
            password
          }
        })

        const token = response.data.user.token
        await this.$auth.setUserToken(token)

        this.$router.push('/')
      } catch (e) {
        if (e.response && e.response.data.errors) {
          this.errors = e.response.data.errors
          return
        }
        this.errors = {
          fatal: e.message
        }
      } finally {
        this.isLoading = false
      }
    }
  },
  head: {
    title: `Sign Up - ${process.env.title}`
  }
}
</script>
