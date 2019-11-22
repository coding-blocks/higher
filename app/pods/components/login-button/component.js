import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ENV from 'hiring-front/config/environment';
import { getPublicUrl  } from 'hiring-front/utils/browser';

export default class LoginButton extends Component {
  @service session
  @service api

  loginUrl = `${ENV.ONEAUTH_URL}/oauth/authorize?response_type=code&client_id=${ENV.CLIENT_ID}&redirect_uri=${getPublicUrl()}`

  @action 
  Authenticate() {
    window.location.href = this.get('loginUrl')
  }

  @action 
  invalidateSession () {
    this.session.invalidate()
  }
}
