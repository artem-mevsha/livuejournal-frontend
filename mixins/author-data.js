export default {
  computed: {
    authorData() {
      // get name of author without @
      // if it's current user - return 'My'
      const authorId = this.$route.params.user
      let authorName = authorId.slice(1, authorId.length)
      if (authorName === this.loggedInUser.username) {
        authorName = 'My'
      }

      // route for user's page
      const authorRoute = {
        name: 'user-index',
        params: {
          user: this.$route.params.user
        }
      }

      // route for user's favorite articles page
      const favoritesRoute = {
        name: 'user-index-favorited',
        params: {
          user: this.$route.params.user
        }
      }

      return {
        authorName,
        authorRoute,
        favoritesRoute
      }
    }
  }
}
