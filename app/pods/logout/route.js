import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LogutRoute extends Route{
  @service session

  beforeModel() {
    try {
      this.get('session').invalidate();
    }
    catch (err) {
      window.location.replace('/')
    }
  }
}
