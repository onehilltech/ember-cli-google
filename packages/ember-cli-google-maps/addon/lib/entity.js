import Component from '@glimmer/component';

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';

export default class MapEntity extends Component {
  @service
  gMaps;

  @tracked
  show = true;

  get eventType () {
    return 'GEntity';
  }

  @action
  didInsert (element) {
    // Store the element for this entity. We need this for sending events.
    Object.defineProperty (this, 'entityElement', { value: element, writable: false, configurable: false });

    element.classList.add ('g-map__entity');

    // Each element must have a parent map. Let's locate the parent element, and then
    // use that element to locate the map.
    let gMapElement = element.parentElement;

    while (!!gMapElement && !gMapElement.classList.contains ('g-map')) {
      gMapElement = gMapElement.parentElement;
    }

    if (!gMapElement) {
      throw new Error ('The Google Maps entity must be a child of the GMap component.');
    }

    Object.defineProperty (this, 'parentElement', { value: gMapElement, writable: false, configurable: false, enumerable: false });

    // Register this entity with the map.
    this.map.registerEntity (this);
  }

  /**
   * Get the map component that owns this entity.
   *
   * @return {*}
   */
  get map () {
    return this.gMaps.mapFor (this.parentElement);
  }

  get clickable () {
    return true;
  }

  /**
   * Create the entity for the specified map.
   *
   * @param map         The target Google Map object.
   */
  create (gMap) {
    const entity = this.createEntity ();
    Object.defineProperty (this, 'entity', { value: entity, writable: false, configurable: false });

    entity.setMap (gMap);

    if (this.clickable) {
      entity.addListener ('click', (ev) => {
        const event = new CustomEvent (`${this.eventType}:click`, {
          detail: Object.assign ({}, ev, { entity })
        });

        this.entityElement.dispatchEvent (event);
      });
    }
  }

  get isCreated () {
    return !!this.entity;
  }

  willDestroy () {
    super.willDestroy ();

    if (isPresent (this.entity)) {
      this.entity.setMap (null);
    }
  }

  @action
  recenter (element, [center]) {
    this.entity.setCenter (center);
  }
}
