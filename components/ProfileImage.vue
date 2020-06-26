<template>
  <figure class="image" :class="sizeClass">
    <img :src="processedImage" :alt="profileName" class="img" />
  </figure>
</template>

<script>
export default {
  name: 'LvProfileImage',
  props: {
    profileImage: {
      type: String,
      default: ''
    },
    profileName: {
      type: String,
      required: true
    },
    sizeClass: {
      type: String,
      default: 'is-32x32'
    }
  },
  computed: {
    processedImage() {
      if (this.profileImage && this.profileImage.length) {
        return this.profileImage
      }
      return '/images/placeholder-avatar.png'
    }
  }
}
</script>

<style lang="sass" scoped>
.image
  border-radius: 5px
  background-color: #fff

.img
  border-radius: inherit
</style>
