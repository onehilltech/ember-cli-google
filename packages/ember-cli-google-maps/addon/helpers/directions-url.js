import { helper } from '@ember/component/helper';

export default helper(function directionsUrl([destination], options) {
  const { api = 1 } = options;

  return `https://www.google.com/maps/dir/?api=${api}&destination=${encodeURIComponent(destination)}`;
});
