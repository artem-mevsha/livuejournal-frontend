<template>
  <section class="comments">
    <hr />
    <h3 class="title is-5">Comments</h3>
    <lv-comments-form v-if="isAuthenticated" />

    <lv-comments-item
      v-for="comment in comments"
      :key="`comment-${comment.id}`"
      :comment="comment"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import LvCommentsForm from './CommentsForm'
import LvCommentsItem from './CommentsItem'

export default {
  name: 'LvComments',
  components: {
    LvCommentsForm,
    LvCommentsItem
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      comments: 'article/comments',
      isAuthenticated: 'isAuthenticated'
    })
  },
  async created() {
    await this.$store.dispatch('article/fetchComments', this.slug)
  }
}
</script>
