import Mixin from '@ember/object/mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default Mixin.create(AuthenticatedRouteMixin, {
  session: service(),
  router: service(),

  beforeModel(transition) {
    const redirectionPath = window.localStorage.getItem('redirection_path')
    if(!this.session.isAuthenticated && !redirectionPath) {
      window.localStorage.setItem('redirection_path', this.router.get('currentURL') || window.location.pathname)
    }

    return this._super(...arguments)
  }
});
