const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeJsPlugin = require('optimize-js-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const config = require('./webpack.config.js')

config.mode = 'production'
config.plugins.push(new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }))

config.optimization = {
  minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true,
    }),
  ],
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'initial'
      }
    },
  },
  runtimeChunk: 'single',
}

config.plugins.push(new OptimizeJsPlugin({ sourceMap: false }))

config.plugins.push(
  new OptimizeCssnanoPlugin({
    cssnanoOptions: {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    },
  })
)

module.exports = config
