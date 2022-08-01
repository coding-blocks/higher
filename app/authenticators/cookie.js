import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
export default BaseAuthenticator.extend({
  api: service(),
  restore(data) {

  },

  authenticate(data){
    return this.api.post(`/login`, {
      data: {
        code: data.code,
      }
    })
  },

  invalidate(data){

  }
})