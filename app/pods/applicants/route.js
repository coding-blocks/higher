import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  sidenav: service(),

  beforeModel() {
    this.sidenav.set('isHidden', false)
    this.sidenav.set('for', 'applicant')

    this._super(...arguments)
  }
});
