module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/styles/global.scss";',
      },
    },
  },

  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: "http://localhost:3000",
  },
};
