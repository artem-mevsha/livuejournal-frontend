<template>
  <div class="container main-container">
    <div class="columns is-desktop">
      <div
        class="column is-8-widescreen is-offset-2-widescreen is-10-desktop is-offset-1-desktop"
      >
        <h1 class="title has-text-centered">Editor</h1>

        <lv-errors v-if="errors" :errors="errors" />

        <form novalidate @submit.prevent="submitArticle">
          <div class="columns">
            <div class="column is-6-desktop">
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
                  type="textarea"
                  maxlength="255"
                  placeholder="What's this story about?"
                  :disabled="isLoading"
                ></b-input>
              </b-field>
              <b-field label="Tags">
                <b-taginput
                  v-model="tagList"
                  ellipsis
                  placeholder="Add a tag"
                  :disabled="isLoading || isArticleCreated"
                >
                </b-taginput>
              </b-field>
            </div>
            <div class="column is-6-desktop">
              <b-field label="Cover image" class="cover-image">
                <lv-image-upload
                  :image-model="coverImage"
                  image-tag="coverImage"
                  preview-class="is-4by3"
                  image-width="600"
                  image-height="480"
                  @change="onImageChange"
                  @delete="onImageDelete"
                />
              </b-field>
            </div>
          </div>
          <b-field label="Body">
            <b-input
              v-model.lazy="body"
              type="textarea"
              placeholder="Write your story. You can use markdown"
              :disabled="isLoading"
            ></b-input>
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

import LvErrors from '@/components/BaseErrors'
import LvImageUpload from '@/components/ImageUpload'

export default {
  name: 'EditorPage',
  components: {
    LvErrors,
    LvImageUpload
  },
  middleware: ['auth'],
  async fetch({ store, route, redirect }) {
    const slug = route.params.slug

    if (slug) {
      if (
        store.state.auth.user &&
        store.state.article.author &&
        store.state.auth.user.username !==
          store.state.article.article.author.username
      ) {
        return redirect('/')
      } else {
        await store.dispatch('article/fetchArticle', slug)
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
    isArticleCreated() {
      if (this.$route.params.slug) {
        return true
      }
      return false
    },
    ...mapFields('article', [
      'article.title',
      'article.description',
      'article.coverImage',
      'article.body',
      'article.tagList'
    ]),
    ...mapGetters('article', ['errors'])
  },
  created() {
    if (!this.$route.params.slug) {
      this.$store.dispatch('article/clearArticle')
    }
  },
  methods: {
    async submitArticle() {
      const slug = this.$route.params.slug // undefined if new article
      this.isLoading = true
      try {
        await this.$store.dispatch('article/saveArticle', slug)
        this.$router.push('/feed')

        this.$buefy.toast.open('Story has been published')
      } catch (e) {
        if (e.response && e.response.status === 500) {
          this.$buefy.toast.open({
            message: `Cannot publish story. ${e}`,
            type: 'is-danger'
          })
        }
      } finally {
        this.isLoading = false
      }
    },

    onImageChange(fileResponse) {
      this.$store.dispatch('article/updateArticleImage', fileResponse.public_id)
    },

    onImageDelete() {
      this.$store.dispatch('article/updateArticleImage', null)
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
.cover-image
  max-width: 23.4rem
.buttons
  margin-top: 1.5rem
</style>
