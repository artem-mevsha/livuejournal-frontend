<template>
  <figure class="image" :class="sizeClass">
    <cld-image
      v-if="profileImage"
      :public-id="profileImage"
      height="128"
      width="128"
      crop="fill"
    >
      <cld-transformation dpr="2.0" />
    </cld-image>
    <img v-else src="/images/placeholder-avatar.png" :alt="profileName" />
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
  }
}
</script>

<style lang="sass" scoped>
.image
  background-color: #fff
  border-radius: 5px
  overflow: hidden
</style>
