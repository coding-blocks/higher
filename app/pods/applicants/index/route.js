import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicantIndexRoute extends Route {
  @service session
  @service sidenav

  beforeModel() {
    if(this.session.isAuthenticated) {
      this.transitionTo('applicants.profile.me')
    } else {
      this.sidenav.set('isHidden', true)
    }
  }

  @action
  willTransition() {
    this.sidenav.set('isHidden', false)
  }
}
