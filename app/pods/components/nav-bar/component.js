import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import ENV from 'hiring-front/config/environment';

export default class NavBarComponent extends Component {
  @service session
  @service currentUser
  @service api
  @service sidenav
  @service router

  @computed('router.currentURL')
  get isCompanyRouteActive() {
    let currentURL = this.router.currentURL.split('/')[1]
    return currentURL === 'recruiter'
  }

  @action 
  toggleHamburgerNav(){

  }

  get logoutLink() {
    return ENV.ONEAUTH_URL + '/logout?redirect=' + ENV.PUBLIC_URL + 'logout'
  }
}
