'use strict';

module.exports = {
  name: require('./package').name,

  contentFor (type, config) {
    if (type === 'head') {
      if (!!config['ember-cli-google'] && !!config['ember-cli-google'].analytics) {
        const { version, measurementId, forceEnable = false } = config['ember-cli-google'].analytics;

        if (version === 'v4' && (config.environment === 'production' || forceEnable)) {
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
