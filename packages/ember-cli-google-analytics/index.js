/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-google-analytics',

  contentFor (type, config) {
    if (type === 'body-footer') {
      return '<script async src="https://www.google-analytics.com/analytics.js"></script>';
    }
  }
};
