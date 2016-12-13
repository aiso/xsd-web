'use strict'

const path = require('path')
const resolve = path.resolve
const base = (...args) =>
  Reflect.apply(resolve, null, [path.resolve(__dirname, '..'), ...args])
const paths = {
  base: base,
  client: base.bind(null, 'client'),
}


const pkg = require('../package')

module.exports = {
  port: 4000,
  title: 'xiansda-web',
  vendor: Object.keys(pkg.dependencies),
  babel: {
    babelrc: false,
    presets: [
      ['es2015', {modules: false}],
      'stage-1'
    ],
    plugins: [
      'transform-vue-jsx'
    ]
  },
  postcss: [
  /*
    require('autoprefixer')({
      // Vue does not support ie 8 and below
      browsers: ['last 2 versions', 'ie > 8']
    }),*/
    require('postcss-nested'),
    require('postcss-custom-properties')({
      variables: require(paths.client('assets/variables'))
    }),
    require('postcss-mixins')({
      mixinsDir: paths.client('assets/mixins')
    }),
    require('postcss-functions')({
      functions : {
        pxToRem : function($px) {
          return $px*320/750/20 + 'rem';
        }
      }
    }),
    require('postcss-cssnext')({
      // see: https://github.com/ai/browserslist#queries
      browsers: 'Android >= 4, iOS >= 7'
    }),
  ],
  cssModules: true,
}
