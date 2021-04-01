import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';
import { getOwner } from '@ember/application';
import { get } from '@ember/object';

export default class GStaticMapComponent extends Component {
  get options () {
    let params = [
      `size=${this.size}`,
      `maptype=${this.type}`,
      `zoom=${this.zoom}`,
      `key=${this.apiKey}`
    ];


    if (isPresent (this.args.center)) {
      params.push (`center=${encodeURI(this.args.center)}`);
    }

    return params.join ('&');
  }

  get size () {
    return `${this.width}x${this.height}`;
  }

  get width () {
    return this.args.width || 600;
  }

  get height () {
    return this.args.height || 300;
  }

  get type () {
    return this.args.type || 'roadmap';
  }

  get zoom () {
    return this.args.zoom || 13;
  }

  get apiKey () {
    if (isPresent (this.args.apiKey)) {
      return this.args.apiKey;
    }

    const ENV = getOwner (this).resolveRegistration ('config:environment');
    return get (ENV, 'ember-cli-google.maps.apiKey');
  }
}
