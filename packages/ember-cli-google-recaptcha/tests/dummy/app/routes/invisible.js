import Route from '@ember/routing/route';

export default class InvisibleRoute extends Route {
  setupController (controller) {
    super.setupController (...arguments);

    controller.execute = true;
  }

  resetController (controller, isExiting) {
    super.resetController (...arguments);

    if (isExiting) {
      controller.reset = false;
      controller.execute = false;
    }
  }
}
