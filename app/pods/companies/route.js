import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),
  sidenav: service(),
  
  beforeModel() {
    if(this.currentUser.get('user.userType') === 'recruiter') {
      this.sidenav.set('isHidden', false)
      this.sidenav.set('for', 'recruiter')
    } else {
      this.sidenav.set('isHidden', true)
    }
  }
});
