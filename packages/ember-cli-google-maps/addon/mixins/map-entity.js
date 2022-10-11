import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Mixin.create({
  classNames: ['g-entity'],

  _entity: null,

  /// Show/hide the entity.
  show: true,

  didInsertElement() {
    this._super(...arguments);

    this.parentView.on('loading', this, '_mapLoading');
    this.parentView.on('loaded', this, '_mapLoaded');

    const map = this.map;

    if (isPresent(map)) {
      const entity = this.createEntity();
      this._showEntity(entity);
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    this.parentView.off('loading', this, '_mapLoading');
    this.parentView.off('loaded', this, '_mapLoaded');

    let entity = this.getEntity();

    if (isPresent(entity)) {
      entity.setMap(null);
    }
  },

  didUpdateAttr() {
    let entity = this.getEntity();

    if (isPresent(entity)) {
      this._showEntity(entity);
    }
  },

  /**
   * Get the implementation for the entity.
   */
  getEntity() {},

  willLoadMap() {},

  didLoadMap(/* map */) {},

  createEntity() {},

  _mapLoading() {
    this.willLoadMap();
  },

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
  },

  map: computed.reads('parentView.map').volatile(),

  /**
   * Either show or hide the entity.
   *
   * @param entity
   * @private
   */
  _showEntity(entity) {
    if (isPresent(entity)) {
      const show = this.show === undefined ? true : this.show;
      const map = this.map;

      if (show) {
        entity.setMap(map);
      } else {
        entity.setMap(null);
      }
    }
  },
});
