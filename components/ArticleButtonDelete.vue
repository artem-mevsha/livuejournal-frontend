<template>
  <button
    :class="{ 'is-loading': isDeleting }"
    class="button is-danger is-outlined"
    @click.prevent="confirmDelete"
  >
    <span class="icon is-small">
      <fa :icon="['fas', 'trash']"></fa>
    </span>
    <span>Delete</span>
  </button>
</template>

<script>
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
  name: 'LvArticleButtonDelete',
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isDeleting: false
    }
  },
  methods: {
    confirmDelete() {
      this.$buefy.dialog.confirm({
        title: 'Deleting story',
        message: 'Are you sure you want to <b>delete</b> this story?',
        confirmText: 'Delete story',
        type: 'is-danger',
        hasIcon: false,
        onConfirm: () => this.deleteArticle()
      })
    },
    async deleteArticle() {
      try {
        await this.$store.dispatch('article/deleteArticle', this.slug)
        Snackbar.open({
          message: 'Story has been removed',
          type: 'is-primary'
        })
        this.$router.push('/feed')
      } catch (e) {
        Snackbar.open({
          message: 'Cannot delete story. Please, try again',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
