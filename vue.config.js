module.exports = {
    css: {
        loaderOptions: {
            less: {
                additionalData: '@import "@/styles/global.less";'
            }
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
}
