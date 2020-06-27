<template>
  <section class="hero is-primary is-bold is-medium">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{ title }}</h1>
        <h2 class="subtitle">{{ subtitle }}</h2>
        <div class="buttons">
          <nuxt-link class="button is-light is-rounded" :to="'auth/login'">
            Log in
          </nuxt-link>
          <nuxt-link class="button is-dark is-rounded" :to="'auth/signup'">
            Sign up
          </nuxt-link>
        </div>
      </div>
      <div class="hero-cover is-hidden-mobile">
        <img class="hero-image" src="/images/hero-cover.jpg" :alt="title" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: process.env.title,
      subtitle: 'A place to share your knowledge'
    }
  }
}
</script>

<style lang="sass" scoped>
.hero-body
  position: relative

.hero-cover
  position: absolute
  top: 0
  right: 0
  width: 50%
  height: 100%
  overflow: hidden
  clip-path: polygon(20% 0, 100% 0%, 100% 100%, 0% 100%)

.hero-image
  object-fit: cover
  width: 100%
  height: 100%
</style>
