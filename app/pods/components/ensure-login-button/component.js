import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default class EnsureLoginButtonComponent extends Component {
  @service session
  @service router

  tagName = 'button'
  redirectionPath = null

  click() {
    if (!this.session.isAuthenticated) {
      window.localStorage.setItem('redirection_path', this.redirectionPath || window.location.pathname)
      document.getElementsByTagName('cb-login-signup')[0].classList.remove('hide-cb-login-signup-prompt')
    } else {
      this.callIfLoggedIn()
    }

  }
}
