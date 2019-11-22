import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  session: service(),
  queryParams: {
    code: {
      refreshModel: true
    }
  },

  init() {
    this._super(...arguments);
  },

  beforeModel(transition) {
    if(this.session.isAuthenticated) {
      this.currentUser.load()
    } else {
      const { code } = transition.to.queryParams
      if (code) {
        this.get('session').authenticate('authenticator:jwt', { identification: code, password: code, code})
        .then(r => {
          this.currentUser.load()
        })
      }
    }
  }
});
