module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_fonts.scss";
          @import "@/scss/_medias.scss";
          @import "@/scss/_mixins.scss";
        `
      }
    }
  },

  devServer: {
    watchOptions: {
      clientLogLevel: 'warning'
    }
  }
}
