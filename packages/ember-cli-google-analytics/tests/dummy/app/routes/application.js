import Route from "@ember/routing/route";
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service
  gtag;

  async activate () {
    await super.activate (...arguments);
    await this.gtag.configure ();
  }
}
