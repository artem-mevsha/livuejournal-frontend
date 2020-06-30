<template>
  <div class="container main-container">
    <div class="content">
      <h2 class="title is-3 has-text-grey">
        Yet another Medium/Livejournal clone
      </h2>
      <h3 class="is-6 has-text-grey">
        Technology stack used:
      </h3>
      <ul>
        <li>Vue.js+Vuex</li>
        <li>Nuxt (@nuxtjs/auth, @nuxtjs/axios)</li>
        <li>BulmaCSS, nuxt-buefy</li>
        <li>Cloudinary for image uploading (on the frontend)</li>
      </ul>
      <p>
        Author:
        <a
          href="https://github.com/artem-mevsha/livuejournal-frontend"
          target="blank"
          rel="noreferrer"
        >
          Artem Mevsha
        </a>
      </p>
      <h4 class="is-6 has-text-grey">
        API from
        <a
          href="https://github.com/gothinkster/realworld"
          target="_blank"
          rel="noreferrer"
        >
          realworld
        </a>
        is used as a backend
      </h4>
      <ul>
        <li>
          Link to API: https://livuejournal.herokuapp.com/api. Example:
          <a
            href="https://livuejournal.herokuapp.com/api/articles?limit=10&offset=0"
            target="_blank"
            rel="noreferrer"
          >
            Articles API endpoint
          </a>
        </li>
        <li>
          <a
            href="https://github.com/gothinkster/laravel-realworld-example-app"
            target="_blank"
            rel="noreferrer"
          >
            Laravel realworld project. Author: gothinkster
          </a>
        </li>
        <li>
          <a
            href="https://github.com/artem-mevsha/livuejournal-frontend/blob/master/LivueJournal_API.postman_collection.json"
            target="_blank"
            rel="noreferrer"
          >
            Check Postman API collection
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  head: {
    title: `About - ${process.env.title}`
  }
}
</script>
