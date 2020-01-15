import { isEmpty } from '@ember/utils';
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

  beforeModel(transition) {
    if(!isEmpty(transition.to.queryParams.code)) {
      if(this.session.isAuthenticated) {
        return this.transitionTo({ queryParams: { code: null }})
      } else {
        const { code } = transition.to.queryParams
        if (code) {
          this.get('session').authenticate('authenticator:jwt', { identification: code, password: code, code})
            .then(r => this.transitionTo({ queryParams: { code: null } }))
        }
      }
    }
  },

  model() {
    if(this.session.isAuthenticated) {
      return this.currentUser.load()
    }
  }
});
