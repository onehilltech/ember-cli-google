import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class V2Controller extends Controller {
  @tracked
  response;

  @tracked
  reset;

  @action
  verified (response) {
    this.response = response;
  }

  @action
  resetRecaptcha () {
    this.reset = true;
    this.response = null;
  }
}
