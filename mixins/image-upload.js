export default {
  methods: {
    async imageUpload(file, tags) {
      if (!file) {
        throw new Error('Image was not provided')
      }

      if (!file.type.includes('image/')) {
        throw new Error('Invalid file format')
      }

      const presetName = process.env.CLOUDINARY_PRESET

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
    }
  }
}
