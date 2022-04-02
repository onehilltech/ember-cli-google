import Controller from '@ember/controller';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';

export default class InvisibleController extends Controller {
  @tracked
  reset;

  @tracked
  execute;

  @tracked
  response;

  @action
  verified (response) {
    this.response = response;
  }

  @action
  resetRecaptcha () {
    this.response = null;
    this.reset = true;
  }
}
