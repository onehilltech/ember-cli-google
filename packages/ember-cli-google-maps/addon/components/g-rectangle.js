import MapEntity from '../lib/entity';
import getOptions from '../lib/get-options';

export default class GRectangleEntity extends MapEntity {
  createEntity() {
    return new google.maps.Rectangle(this.options)
  }

  get options () {
    return getOptions (this.args, [
      'bounds',
      'clickable',
      'draggable',
      'editable',
      'fillColor',
      'fillOpacity',
      'stokeColor',
      'strokeOpacity',
      'strokePosition',
      'strokeWeight',
      'zIndex',
    ]);
  }
};
