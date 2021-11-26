import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

<<<<<<< HEAD
Router.map(function() {
  this.route('v2');
  this.route('invisible');
  this.route('v3');
});

export default Router;
=======
Router.map(function () {});
>>>>>>> 1b6fdd4 (v3.3.0...v3.24.0)
