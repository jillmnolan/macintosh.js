{
  test: /\.tsx?$/,
  exclude: /(node_modules|.webpack)/,
  loaders: [{
    loader: 'ts-loader',
    options: {
      transpileOnly: true
    }
  }]
}
