if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const options = {
  sourceMap: process.env.NODE_ENV === 'development' ? true : false
};

console.log('--------------------------------');
console.log(process.env.NODE_ENV);
console.log('--------------------------------');

const VENDOR_LIBS = [
  'lodash'
];

const config = {
  entry: {
    bundle: './src/scripts/index.js',
    sass: './src/sass/main.scss',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  devtool: "source-map",
  module: {
    rules: [
      // babel
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },

      // sass
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              minimize: true,
              modules: false,
              sourceMap: options.sourceMap,
              importLoaders: 2
              }
            },

            {
              loader: 'sass-loader',
              query: {
                sourceMap: options.sourceMap,
                sourceMapContents: options.sourceMap
              }
          }]
        })
      },
      // sass end

      // img loaders
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {}
          }
        ]
      }
    ] //rules end
  },
  watch: true,
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Tether: 'tether'
    }),

    new ExtractTextPlugin({
      filename: 'style.bundle.css',
      allChunks: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ['./assetsss/*.html'],
      server: { baseDir: ['dist'] }
    })
  ]
};

module.exports = config;
