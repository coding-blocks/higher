import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  sidenav: service(),

  async beforeModel() {
    this.sidenav.set('isHidden', false)

    this._super(...arguments)
  }
});
