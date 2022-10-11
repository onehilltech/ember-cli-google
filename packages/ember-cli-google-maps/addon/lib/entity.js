import Component from '@glimmer/component';

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

export default class MapEntity extends Component {
  @tracked
  show = true;

  @action
  didInsert(element) {
    element.classList.add('g-entity');
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    this.parentView.on('loading', this, '_mapLoading');
    this.parentView.on('loaded', this, '_mapLoaded');

    const map = this.map;

    if (isPresent(map)) {
      const entity = this.createEntity();
      this._showEntity(entity);
    }
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);

    this.parentView.off('loading', this, '_mapLoading');
    this.parentView.off('loaded', this, '_mapLoaded');

    let entity = this.getEntity();

    if (isPresent(entity)) {
      entity.setMap(null);
    }
  }

  didUpdateAttr() {
    let entity = this.getEntity();

    if (isPresent(entity)) {
      this._showEntity(entity);
    }
  }

  /**
   * Get the implementation for the entity.
   */
  getEntity() {}

  willLoadMap() {}

  didLoadMap(/* map */) {}

  createEntity() {}

  _mapLoading() {
    this.willLoadMap();
  }

  /**
   * The map has been loaded.
   *
   * @param map
   * @private
   */
  _mapLoaded(map) {
    // Notify the subclass the map has been loaded.

    this.didLoadMap(map);

    // Instruct the subclass to create its entity. We will then show the entity.
    const entity = this.createEntity();
    this._showEntity(entity);
  }

  /**
   * Either show or hide the entity.
   *
   * @param entity
   * @private
   */
  _showEntity(entity) {
    if (isPresent(entity)) {
      if (this.show) {
        entity.setMap(this.map);
      } else {
        entity.setMap(null);
      }
    }
  }
}
