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
