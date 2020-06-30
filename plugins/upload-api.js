/**
 * API for uploading images to Cloudinary
 * can be used like:
 * await this.$uploadApi.$post('upload', formData)
 * where formData is 'multipart/form-data' fields
 * check ~components/ImageUpload.vue file
 */

export default function({ $axios }, inject) {
  const cloudName = 'artem-demo'

  const uploadApi = $axios.create({
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  // Set baseURL to something different
  uploadApi.setBaseURL(`https://api.cloudinary.com/v1_1/${cloudName}/`)

  delete uploadApi.defaults.headers.common.Authorization

  // Inject to context as $uploadApi
  inject('uploadApi', uploadApi)
}
