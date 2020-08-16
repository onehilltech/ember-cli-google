'use strict';

module.exports = {
  name: require('./package').name,

  contentFor (type) {
    if (type === 'body-footer') {
      return '<script async src="https://www.google-analytics.com/analytics.js"></script>';
    }
  }
};
