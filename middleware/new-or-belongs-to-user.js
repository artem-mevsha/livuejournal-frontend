export default function({ store, route, redirect }) {
  const articleState = store.state.article
  if (route.params.slug && articleState) {
    if (
      store.state.auth.user.username !== articleState.article.author.username
    ) {
      return redirect('/')
    }
  }
}
