import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RecruiterIndexRoute extends Route {
  @service sidenav
  
  beforeModel() {
    this.sidenav.set('isHidden', true)
  }

  model() {
    return this.store.createRecord('company-lead')
  }

  setupController(controller, model) {
    controller.set('lead', model)
  }
}
