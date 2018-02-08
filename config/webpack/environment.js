const {environment} = require('@rails/webpacker')

const webpack = require('webpack')

// Globals
environment.plugins.set('Provide', new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  })
)

module.exports = environment
