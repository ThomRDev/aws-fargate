/* eslint-disable */
'use strict'

require('dotenv').config();

exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME || 'AppNestDefault'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: {
    level: process.env.NEW_RELIC_LOG_LEVEL || 'info',
  },
}
