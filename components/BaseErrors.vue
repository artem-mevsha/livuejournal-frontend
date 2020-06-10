<template>
  <section class="errors-list">
    <b-notification
      v-for="(errorValue, errorKey) in errors"
      :key="errorKey"
      type="is-danger-light"
      aria-close-label="Close notification"
      role="alert"
    >
      <span class="is-capitalized">{{ errorKey }}</span>
      {{ errorValue | errorFilter }}
    </b-notification>
  </section>
</template>

<script>
export default {
  name: 'LvErrors',
  props: {
    errors: {
      type: Object,
      required: true
    }
  }
}
</script>
