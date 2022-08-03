import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Ember from 'ember';
import ENV from 'hiring-front/config/environment';

export default Service.extend({
  api: service(),
  router: service(),
  cookieName: 'cb_auth',
  isAuthenticated: false,
  data: null,

  init() {
    this._super(...arguments)
    this.validate()
  },

  async authenticate(data) {
    await this.api.post('/login',{
      data: {
        code: data.code
      }
    }).catch(err => console.log(err))
    this.validate()
    this.router.transitionTo('application')
  },
  
  getCookieToken(){
    if(!Ember.isEmpty(document.cookie)){
      const cookies = document.cookie.split(';')
      const cookie = cookies.filter(c => c.includes(this.cookieName))[0]
      if(!Ember.isEmpty(cookie)) {
        return cookie.split('=')[1]
      }
    }
  },

  async invalidate() {
    await this.api.post('/logout').catch(err => console.log(err))
    window.location.href = `${ENV.ONEAUTH_URL}/logout?returnTo=${ENV.PUBLIC_URL}`
  },

  validate() {
    const token = this.getCookieToken()

    if(Ember.isEmpty(token)) {
      this.set('data', null)
      this.set('isAuthenticated', false)
    } else {
      this.set('data', { token })
      this.set('isAuthenticated', true)
    }
  }

})
