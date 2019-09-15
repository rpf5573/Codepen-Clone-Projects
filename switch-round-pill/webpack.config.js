const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  name: 'user',
  entry: [path.join(__dirname, '/main.ts')],
  devtool: 'source-map',
  output: {
    filename: "main.js",
    path: path.join(__dirname),
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'cache-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: 'sass-loader',
          },
        ]
      },
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                experimentalWatchApi: true,
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "style.css",
      path: path.join(__dirname),
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  devServer: {
    contentBase: path.join(__dirname),
    port: '3000',
    open: true,
  }
};