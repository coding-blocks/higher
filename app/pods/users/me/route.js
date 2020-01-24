import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  currentUser: service(),

  beforeModel() {
    if(this.session.isAuthenticated) {
      this.transitionTo('users.id', this.currentUser.user.id)
    }               
  }
});
