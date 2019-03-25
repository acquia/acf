const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

// the path(s) that should be cleaned
let pathsToClean = [
  'packages/**/*.bundle.js'
]

// the clean options to use
let cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false
}

module.exports = {
  context: path.resolve(__dirname, 'packages'),
  entry: {
    vendor: ['@babel/polyfill'],
    mini_cart: ['./mini_cart/index.js'],
    full_cart: ['./full_cart/index.js'],
    add_to_cart: ['./add_to_cart/index.js']
  },
  output: {
    filename: '[name]/[name].bundle.js',
    path: path.resolve(__dirname, './packages')
  },
  resolve: {
    alias: {
      acf: path.resolve(__dirname, './packages/core/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ],
  performance: {
    hints: false
  }
}
