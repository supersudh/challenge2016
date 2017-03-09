/**
  * Created by Zhengfeng Yao on 16/8/24.
  */
import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: [
    new ProgressBarPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        exclude: /\.es5\.js$/,
        loader: 'babel-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.json5$/,
        loader: 'json5-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      }, {
        test: /\.(svg|jpe?g|png|gif)(\?.*)?$/,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.(woff\d?|ttf|eot)(\?.*)?$/,
        loader: 'file-loader',
      }, {
        test: /\.est$/,
        loader: 'babel-loader!template-string-loader'
      }
    ],
  },

  postcss: function plugins(bundler) {
    return [
      require('postcss-nested')(),
      require('pixrem')(),
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      require('postcss-flexibility')(),
      require('postcss-discard-duplicates')()
    ];
  },
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = extend(true, {}, config, {
  entry: {
    core: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'redux-logger',
        'redux-devtools-log-monitor', 'redux-devtools', 'redux-devtools-dock-monitor'],
    lib: ['lodash', 'moment'],
    client: './src/client.js'
  },
  output: {
    path: path.join(__dirname, '../build/public'),
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
    chunkFilename: '[hash].chunk.js',
  },

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  module: {
    loaders: [
      ...config.module.loaders
      , {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
          `css?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]!postcss!sass`)
      },{
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style',
          `css?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]!postcss!sass`)
      },{
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style',
          `css?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]!postcss!stylus`)
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style',
          `css?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]!postcss!less`),
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style',
          `css?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]!postcss`),
      },
    ]
  },
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({
      ...GLOBALS,
      'process.env.BROWSER': true,
      __BROWSER__: true
    }),
    new AssetsPlugin({
      path: path.join(__dirname, '../build'),
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),
    new ExtractTextPlugin(DEBUG ? '[name].css?[hash]' : '[name].[hash].css'),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
          screw_ie8: true,

          // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
  ],
});

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = extend(true, {}, config, {
  entry: './src/server/server.js',
  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: [
    /^\.\/assets$/,
    function filter(context, request, cb) {
      const isExternal =
        request.match(/^[@a-z][a-z\/\.\-0-9]*$/i)
      cb(null, Boolean(isExternal));
    },
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  devtool: 'source-map',
  module: {
    loaders: [
      ...config.module.loaders
      , {
        test: /\.scss$/,
        loader: `css/locals?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]!postcss!sass`
      },{
        test: /\.sass$/,
        loader: `css/locals?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]!postcss!sass`
      },{
        test: /\.styl/,
        loader: `css/locals?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]!postcss!stylus`
      }, {
        test: /\.less$/,
        loader: `css/locals?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]!postcss!less`
      }, {
        test: /\.css$/,
        loader: `css/locals?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]!postcss`
      },
    ]
  },
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({
      ...GLOBALS,
      'process.env.BROWSER': false,
      __BROWSER__: false
    }),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
  ],
});

export default [clientConfig, serverConfig];
