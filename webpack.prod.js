// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e

import merge from 'webpack-merge'
import common from './webpack.common'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import OptimizeJsPlugin from 'optimize-js-plugin'
import OptimizeCssnanoPlugin from '@intervolga/optimize-cssnano-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

module.exports = merge(common, {
  mode: 'production',
  output: {
    pathinfo: false,
  },
  module: {
    rules: [
      { test: /\.(css)$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({ cache: true, parallel: true }),
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
    removeAvailableModules: false,
    removeEmptyChunks: false,
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    new OptimizeJsPlugin({ sourceMap: false }),
    new OptimizeCssnanoPlugin({
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    })
  ]
})
