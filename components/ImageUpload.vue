<template>
  <div>
    <figure v-if="imageModel" class="image" :class="previewClass">
      <cld-image
        :public-id="imageModel"
        :width="imageWidth"
        :height="imageHeight"
        crop="fill"
      >
        <cld-transformation dpr="2.0" />
      </cld-image>
      <button
        class="button is-dark image-delete is-small"
        type="button"
        @click="deleteImage"
      >
        <span class="icon">
          <fa :icon="['fas', 'trash']"></fa>
        </span>
      </button>
    </figure>
    <b-upload
      v-else
      v-model="imageFile"
      drag-drop
      type="is-primary"
      accept="image/*"
      class="upload"
      :disabled="isLoading"
      @input="onImageChange"
    >
      <section class="section">
        <div class="content has-text-centered">
          <p>
            <span class="icon is-largest">
              <fa :icon="['fas', 'upload']"></fa>
            </span>
          </p>
          <p>Drop your files here or click to upload</p>
        </div>
      </section>
    </b-upload>
  </div>
</template>

<script>
export default {
  name: 'LvImageUpload',
  props: {
    imageModel: {
      type: String,
      default: null
    },
    // e.g: 'avatar', 'coverImage'..
    imageTag: {
      type: String,
      default: ''
    },
    imageWidth: {
      type: String,
      default: '128'
    },
    imageHeight: {
      type: String,
      default: '128'
    },
    previewClass: {
      type: String,
      default: 'is-128x128'
    }
  },
  data() {
    return {
      imageFile: null,
      isLoading: false
    }
  },
  methods: {
    async imageUpload(file, tags) {
      if (!file) {
        throw new Error('Image was not provided')
      }

      if (!file.type.includes('image/')) {
        throw new Error('Invalid file format')
      }

      const presetName = process.env.cloudinaryPreset

      const formData = new FormData()
      formData.append('upload_preset', presetName)
      formData.append('file', file)

      if (tags) {
        formData.append('tags', tags)
        if (tags.includes('avatar')) {
          formData.append('folder', 'user_avatars')
        } else if (tags.includes('preview')) {
          formData.append('folder', 'article_preview')
        }
      }

      const response = await this.$uploadApi.$post('upload', formData)
      return response
    },

    async onImageChange(file) {
      this.isLoading = true
      try {
        const response = await this.imageUpload(file, this.imageTag)
        this.$emit('change', response)
      } catch (e) {
        this.$buefy.toast.open({
          message: e,
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
      }
    },

    deleteImage() {
      this.imageFile = {}
      this.$emit('delete')
    }
  }
}
</script>

<style lang="sass" scoped>
.upload
  max-width: 13.6rem
  .section
    padding: 2rem 1rem

.image
  border-radius: 5px
  overflow: hidden

.image-delete
  position: absolute
  top: 0.5rem
  right: 0.5rem

.buttons
  margin-top: 1.5rem
  justify-content: space-between
</style>
