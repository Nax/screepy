const path = require('path');
const webpack = require('webpack');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    screepy: './src/index.ts'
  },
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    filename: '[name].js'
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.json', '.ts'],
  },
  optimization: {
    namedModules: false,
    namedChunks: false,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    noEmitOnErrors: true,
  },
  module: {
    rules: [{
      test: /\.(ts|js)$/,
      include: path.resolve(__dirname, 'src'),
      use: [
        'cache-loader',
        'babel-loader',
      ]
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new UglifyPlugin({
      cache: true,
      parallel: true,
      minify: (file) => {
        const extractedComments = [];
        const { error, map, code, warnings } = require('uglify-es')
          .minify(file, {});
        return { error, map, code, warnings, extractedComments };
      },
      cacheKeys: (defaultCacheKeys) => {
        delete defaultCacheKeys['uglify-js'];
        return Object.assign(
          {},
          defaultCacheKeys,
          { 'uglify-js': require('uglify-es/package.json').version },
        );
      }
    }),
  ]
};
