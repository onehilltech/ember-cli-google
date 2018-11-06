import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Mixin.create ({
  _entity: null,

  /// Show/hide the entity.
  show: true,

  didInsertElement () {
    this._super (...arguments);
    this.parentView.on ('loading', this, '_mapLoading');
    this.parentView.on ('loaded', this, '_mapLoaded');
  },

  willDestroyElement () {
    this._super (...arguments);

    this.parentView.off ('loading', this, '_mapLoading');
    this.parentView.off ('loaded', this, '_mapLoaded');
  },

  didUpdateAttr () {
    let entity = this.getEntity ();

    if (isPresent (entity)) {
      this._showEntity (entity);
    }
  },

  /**
   * Get the implementation for the entity.
   */
  getEntity () {

  },

  willLoadMap () {

  },

  didLoadMap (/* map */) {
    const entity = this.getEntity ();
    this._showEntity (entity);
  },


  _mapLoading () {
    this.willLoadMap ();
  },

  /**
   * The map has been loaded.
   *
   * @param map
   * @private
   */
  _mapLoaded (map) {
    // Notify the subclass the map has been loaded. This is where the subclass
    // should create the entity's implementation.

    this.didLoadMap (map);

    // Get the entity, and set its initial visibility.
    const entity = this.getEntity ();
    this._showEntity (entity);
  },

  map: computed (function () {
    return this.parentView.map;
  }).volatile (),

  /**
   * Either show or hide the entity.
   *
   * @param entity
   * @private
   */
  _showEntity (entity) {
    if (isPresent (entity)) {
      const show = this.getWithDefault ('show', true);
      const map = this.get ('map');

      if (show) {
        entity.setMap (map);
      }
      else {
        entity.setMap (null);
      }
    }
  }
});
