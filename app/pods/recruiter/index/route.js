import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class RecruiterIndexRoute extends Route {
  @service sidenav
  @service session

  activate() {
    window.scrollTo(0, 0)
  }
  
  beforeModel() {
    if(this.session.isAuthenticated) {
      this.sidenav.set('for', 'recruiter')
      this.sidenav.set('isHidden', false)
    } else {
      this.sidenav.set('isHidden', true)
    }
  }

  model() {
    return this.store.createRecord('company-lead')
  }

  setupController(controller, model) {
    controller.set('lead', model)
  }

  @action
  willTransition() {
    this.sidenav.set('isHidden', false)
  }
}
