import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  api: service(),
  currentUser: service(),
  session: service(),
  sidenav: service(),

  async beforeModel() {
    this.sidenav.set('for', 'recruiter')

    await this.currentUser.setUserType('recruiter')

    if(this.session.isAuthenticated) {
      this.transitionTo('jobs.search.my')
    }
  }
});
