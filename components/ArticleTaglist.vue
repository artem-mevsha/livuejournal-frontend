<template>
  <b-taglist>
    <b-tag v-for="tag in tags" :key="tag" type="is-light">{{ tag }}</b-tag>
  </b-taglist>
</template>

<script>
export default {
  name: 'LvArticleTaglist',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>
