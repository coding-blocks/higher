import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),

  beforeModel() {
    if (this.currentUser.get('user.userType') === 'recruiter') {
      this.transitionTo('jobs.search.my')
    }
  }
});
