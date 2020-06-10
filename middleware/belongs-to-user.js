export default function({ store, route, redirect }) {
  if (`@${store.state.auth.user.username}` !== route.params.user) {
    return redirect('/')
  }
}
