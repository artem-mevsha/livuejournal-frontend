require('dotenv').config()

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: process.env.title || 'LivueJournal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          process.env.npm_package_description ||
          'Blogging platform build with Nuxt'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          process.env.npm_package_description ||
          'Blogging platform build with Nuxt'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: process.env.title || 'LivueJournal'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  env: {
    title: 'LivueJournal',
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryPreset: process.env.CLOUDINARY_PRESET
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#38b2ac' },
  /*
   ** Global CSS
   */
  css: ['~/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/error.filter.js',
    '~/plugins/cloudinary.js',
    '~/plugins/upload-api.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/auth-module
    '@nuxtjs/auth',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          // import 2 icons from set
          // please note this is PRO set in this example,
          // you must have it in your node_modules to actually import
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faHeart',
              'faChevronLeft',
              'faChevronRight',
              'faPlus',
              'faMinus',
              'faEdit',
              'faTrash',
              'faUpload'
            ]
          }
        ]
      }
    ]
  ],
  buefy: {
    materialDesignIcons: false
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL,
    proxyHeaders: false,
    credentials: false,
    progress: true,
    redirectError: {
      401: '/auth/login',
      404: '/notfound'
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/users/login',
            method: 'post',
            propertyName: 'user.token'
          },
          user: { url: '/user', method: 'get', propertyName: 'user' },
          logout: false
        },
        tokenType: 'Token'
      }
    },
    redirect: {
      login: '/auth/login'
    }
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }

      return { x: 0, y: 0 }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
