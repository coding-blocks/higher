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

  hideHamburgerNav = true;
  mobileSelectedTab = "online";

  @computed('router.currentURL')
  get isRecruiterRouteActive() {
    let currentURL = this.router.currentURL.split('/')[1]
    return currentURL === 'recruiter'
  }

  @computed.equal('currentUser.user.userType', 'applicant') isCurrentUserApplicant 
  

  @action
  toggleHamburgerNav() {
    this.toggleProperty("hideHamburgerNav");
  }

  @action
  logout() {
    this.session.invalidate()
  }

  @action
  showLoginPrompt() {
    document.getElementsByTagName('cb-login-signup')[0].classList.remove('hide-cb-login-signup-prompt')
  }
}
