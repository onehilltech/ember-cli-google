'use strict';

module.exports = {
  name: require('./package').name,

  contentFor (type, config) {
    if (type === 'head') {
      if (config.environment === 'production') {}
      if (!!config['ember-cli-google'] && !!config['ember-cli-google'].analytics) {
        let { version, measurementId } = config['ember-cli-google'].analytics;

        if (version === 'v4') {
          return [
            `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>`,
            "<script>",
            "  window.dataLayer = window.dataLayer || [];",
            "  function gtag(){dataLayer.push(arguments);}",
            "  gtag('js', new Date());",
            `  gtag('config', '${measurementId}');`,
            "</script>"
          ];
        }
      }
    }
  }
};
