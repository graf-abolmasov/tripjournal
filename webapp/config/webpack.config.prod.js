var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var url = require('url');
var paths = require('./paths');
var env = require('./env');

if (env['process.env.NODE_ENV'] !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: [
    require.resolve('./polyfills'),
    path.join(paths.appSrc, 'index')
  ],
  output: {
    path: paths.appBuild,
    filename: 'static/js/webpack.bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '']
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: paths.appSrc
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel',
        query: require('./babel.prod')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?-autoprefixer")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css?-autoprefixer','sass'])
      },
      {
        test: /\.(ico|jpg|png|gif|svg|otf|webp)(\?.*)?$/,
        loader: 'file',
        query: {
          name: '/static/images/[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: '/static/fonts/[name].[ext]'
        }
      }
    ]
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
  plugins: [
    new webpack.DefinePlugin(env),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('static/css/webpack.bundle.css')
  ]
};
