import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  
  beforeModel() {
    if(this.session.isAuthenticated) {
      const redirectionPath = window.localStorage.getItem('redirection_path')
      if (redirectionPath) {
        window.localStorage.removeItem('redirection_path')
        this.transitionTo(redirectionPath)
      }
    }
  },

  model() {
    return this.store.createRecord('company-lead')
  },

  setupController(controller, model) {
    controller.set('lead', model)
  }
});
