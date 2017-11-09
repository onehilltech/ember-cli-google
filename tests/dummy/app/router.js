import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('recaptcha', function() {
    this.route('invisible');
  });

  this.route('charts', function() {
    this.route('line-chart');
  });
});

export default Router;
