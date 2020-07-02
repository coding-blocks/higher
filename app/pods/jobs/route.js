import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  sidenav: service(),
  currentUser: service(),
  
  beforeModel() {
    this.sidenav.set('for', this.currentUser.user.userType || 'applicant')
  }
});
