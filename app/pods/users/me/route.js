import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),

  beforeModel() {
    this.transitionTo('users.id', this.currentUser.user.id)   
  }
});
