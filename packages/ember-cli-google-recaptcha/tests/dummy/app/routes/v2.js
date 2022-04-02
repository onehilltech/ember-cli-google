import Route from '@ember/routing/route';

export default class V2Route extends Route {
  resetController (controller, isExiting) {
    super.setupController (...arguments);

    if (isExiting) {
      controller.response = null;
      controller.reset = true;
    }
  }
}
