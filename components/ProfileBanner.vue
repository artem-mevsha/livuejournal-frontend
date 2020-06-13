<template>
  <section class="hero is-primary is-bold has-text-centered">
    <div class="container">
      <div class="columns">
        <div class="column is-2 is-offset-1">
          <figure class="image is-64x64">
            <img :src="profile.image" class="is-rounded" />
          </figure>
        </div>
        <div class="column is-9">
          <div class="profile-info">
            Some info about the user
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LvProfileBanner',
  props: {
    profile: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.image
  border-radius: 50%
  background-color: #fff

.profile-info
  width: 100%
</style>
