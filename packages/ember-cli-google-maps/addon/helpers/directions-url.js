import Helper from '@ember/component/helper';

export default class DirectionsUrlHelper extends Helper {
  compute ([destination], options) {
    const { api = 1} = options;

    return `https://www.google.com/maps/dir/?api=${api}&destination=${encodeURIComponent (destination)}`;
  }
}