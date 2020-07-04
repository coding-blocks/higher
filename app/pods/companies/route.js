import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  sidenav: service(),
  
  beforeModel() {
    this.sidenav.set('for', this.currentUser.user.userType || 'applicant')
  }
});
