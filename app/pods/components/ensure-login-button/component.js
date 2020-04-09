import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default class EnsureLoginButtonComponent extends Component {
  @service session
  @service router

  tagName = 'button'
  redirectionPath = null

  click() {
    if (!this.session.isAuthenticated) {
      window.localStorage.setItem('redirection_path', this.redirectionPath || this.router.get('currentURL') || window.location.pathname)
      this.router.transitionTo('login')
    } else {
      this.callIfLoggedIn()
    }

  }
}
