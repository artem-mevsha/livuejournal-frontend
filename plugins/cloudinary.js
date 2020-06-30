import Vue from 'vue'
import Cloudinary from 'cloudinary-vue'

Vue.use(Cloudinary, {
  configuration: {
    cloudName: process.env.cloudinaryName
  }
})
