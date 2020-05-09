import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class IndexRoute extends Route {
  @service session
  @service sidenav
  
  beforeModel() {
    this.sidenav.set('isHidden', true)
    
    if(this.session.isAuthenticated) {
      const redirectionPath = window.localStorage.getItem('redirection_path')
      if (redirectionPath) {
        window.localStorage.removeItem('redirection_path')
        return this.transitionTo(redirectionPath)
      }
    }
    this.transitionTo('applicants')
  }

  @action
  willTransition() {
    this.sidenav.set('isHidden', false)
  }
}
