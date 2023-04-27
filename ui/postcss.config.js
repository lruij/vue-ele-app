module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      // root body font size
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: [':root']
    }
  }
}
