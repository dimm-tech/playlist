export default {
  target: 'static',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  router: {
    base: '/',
    //  mode: 'hash'
  },
  head: {
    title: 'playlist',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      //      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap' }
    ]
  },
  loading: {
    color: '#ff0000'
  },
  modules: [],
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/css/main.scss'
  ],
  overrides: [{
    files: ["*.vue"],
    processor: "vue/.vue"
  }],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    //  extractCSS: true,
  }
}