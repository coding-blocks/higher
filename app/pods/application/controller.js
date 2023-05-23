import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  sidenav: service(),
  currentUser: service(),
  showLoginDialog: false,
  showMobileVerificationDialog: computed('currentUser.user', function() {
    const user = this.get('currentUser.user')
    return user.id && !user.verifiedMobile
  })
});
