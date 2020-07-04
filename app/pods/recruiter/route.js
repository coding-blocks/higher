import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  api: service(),
  currentUser: service(),
  session: service(),
  sidenav: service(),

  async beforeModel() {
    this.sidenav.set('for', 'recruiter')

    if(this.session.isAuthenticated) {
      await this.api.request("/users/set-user-type", {
        method: "POST",
        data: {
          user_type: 'recruiter'
        },
      })
      
      this.currentUser.load()
    }

    if(this.session.isAuthenticated) {
      this.transitionTo('recruiter.profiles')
    }
  }
});
