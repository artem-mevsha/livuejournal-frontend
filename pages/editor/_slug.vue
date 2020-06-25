<template>
  <div class="container main-container">
    <div class="columns is-desktop">
      <div
        class="column is-8-widescreen is-offset-2-widescreen is-10-desktop is-offset-1-desktop"
      >
        <h1 class="title has-text-centered">Editor</h1>

        <lv-errors v-if="errors" :errors="errors" />

        <form novalidate @submit.prevent="submitArticle">
          <b-field label="Title">
            <b-input
              v-model.lazy="title"
              type="text"
              placeholder="Story title"
              :disabled="isLoading"
            ></b-input>
          </b-field>
          <b-field label="Description">
            <b-input
              v-model.lazy="description"
              type="text"
              placeholder="What's this story about?"
              :disabled="isLoading"
            ></b-input>
          </b-field>
          <b-field label="Body">
            <b-input
              v-model.lazy="body"
              type="textarea"
              maxlength="400"
              placeholder="Write your story. You can use markdown"
              :disabled="isLoading"
            ></b-input>
          </b-field>
          <b-field label="Tags">
            <b-taginput
              v-model="tagList"
              ellipsis
              placeholder="Add a tag"
              :disabled="isLoading || slug"
            >
            </b-taginput>
          </b-field>
          <div class="buttons">
            <button
              class="button is-primary"
              type="submit"
              :disabled="isLoading"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
import LvErrors from '@/components/BaseErrors'

export default {
  name: 'EditorPage',
  components: {
    LvErrors
  },
  middleware: ['auth'],
  async fetch({ store, route, redirect }) {
    const slug = route.params.slug
    store.dispatch('article/clearArticle')

    if (slug) {
      await store.dispatch('article/fetchArticle', slug)
      if (
        store.state.auth.user.username !==
        store.state.article.article.author.username
      ) {
        return redirect('/')
      }
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    pageTitle() {
      const title = 'New story'
      return title
    },
    ...mapFields('article', [
      'article.title',
      'article.description',
      'article.body',
      'article.tagList'
    ]),
    ...mapGetters('article', ['errors'])
  },
  methods: {
    async submitArticle() {
      const slug = this.$route.params.slug // undefined if new article
      this.isLoading = true
      try {
        await this.$store.dispatch('article/saveArticle', slug)
        this.$router.push('/feed')

        Snackbar.open({
          message: 'Story has been published',
          type: 'is-primary'
        })
      } catch (e) {
        if (e.response && e.response.status === 500) {
          Snackbar.open({
            message: 'Cannot publish story. Please, try again',
            type: 'is-danger'
          })
        }
      } finally {
        this.isLoading = false
      }
    }
  },
  head() {
    return {
      title: `${this.pageTitle} - ${process.env.title}`
    }
  }
}
</script>

<style lang="sass" scoped>
.buttons
  margin-top: 1.5rem
</style>
