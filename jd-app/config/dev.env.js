'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  BASE_API: '"http://localhost:8080"',
  // BASE_API: '"http://3050g139z6.wicp.vip:13788"'
})