import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  api: service(),
  currentUser: service(),
  session: service(),
  sidenav: service(),
  router: service(),

  async beforeModel() {
    this.sidenav.set('isHidden', false)
    this.sidenav.set('for', 'recruiter')

    if(this.session.isAuthenticated) {
      await this.currentUser.setUserType('recruiter')
    }
  }
});
