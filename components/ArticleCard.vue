<template>
  <a :href="`/articles/${article.slug}`" class="card box">
    <div class="card-content">
      <div class="media">
        <div v-if="article.author.image" class="media-left">
          <figure class="image is-32x32">
            <img :src="article.author.image" :alt="article.author.name" />
          </figure>
        </div>
        <div class="media-content">
          <a
            :href="`/@${article.author.username}`"
            class="title is-6 is-block article-author"
          >
            {{ article.author.username }}
          </a>
          <p class="subtitle is-7">
            <time :datetime="article.createdAt">
              {{ article.createdAt }}
            </time>
          </p>
        </div>
      </div>

      <div class="content">
        <h3 class="title article-title is-4">{{ article.title }}</h3>
        <p>{{ article.description }}</p>
        <p class="is-size-7">Read more...</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'LvArticleCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/scss/variables"
.box
  transition: box-shadow .3s ease

.article-author
  transition: color .3s ease
  &:hover
    color: $primary

.article-title
  margin-bottom: 0.5rem
</style>
