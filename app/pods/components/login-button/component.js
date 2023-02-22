import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ENV from 'hiring-front/config/environment';
import { getPublicUrl  } from 'hiring-front/utils/browser';

export default class LoginButton extends Component {
  @service session

  @action 
  Authenticate() {
    document.getElementsByTagName('cb-login-signup')[0].classList.remove('hide-cb-login-signup-prompt')
    localStorage.setItem('redirection_path', window.location.pathname)
  }

  @action 
  invalidateSession () {
    this.session.invalidate()
  }
}
