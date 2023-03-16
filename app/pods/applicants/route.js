import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  sidenav: service(),
  currentUser: service(),

  async beforeModel() {
    this.sidenav.set('isHidden', false)
    this.sidenav.set('for', 'applicant')
    await this.currentUser.setUserType('applicant')

    this._super(...arguments)
  }
});
