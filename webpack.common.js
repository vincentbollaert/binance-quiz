// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e

import webpack from 'webpack'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const entryPath = './src/index.jsx'
const outputPath = './public'
const PUBLIC_PATH = '/'

const config = {
  entry: {
    main: path.resolve(__dirname, entryPath),
  },

  output: {
    path: path.resolve(__dirname, outputPath),
    publicPath: PUBLIC_PATH,
    filename: '[name].bundle.[hash].js',
    chunkFilename: '[name].bundle.[hash].js',
  },

  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.md$/, use: [ 'html-loader', 'highlight-loader', 'markdown-loader'] },
      { test: /\.svg$/, use: 'raw-loader' },

      {
        test: /\.(woff|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
      {
        test: /\.(ico|jpe?g|png)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new MiniCssExtractPlugin({
      fileName: 'style.css',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
}

module.exports = config
