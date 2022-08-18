import Ember from 'ember';
import Component from '@ember/component';
import { action } from '@ember/object';
import ENV from 'hiring-front/config/environment';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class LoginDialog extends Component {
  @service api
  @service session
  @service router

  email = null
  allowSendOtp = true
  otpId = null
  otp = null

  @computed('email', 'allowSendOtp')
  get disableOTP() {
    return Ember.isEmpty(this.email) || !this.allowSendOtp
  }

  @action
  loginFacebook() {
    window.location.href = `${ENV.ONEAUTH_URL}/login/facebook/v2?client=hiring-blocks&redirect_uri=${ENV.PUBLIC_URL}`
  }

  @action
  loginGoogle() {
    window.location.href = `${ENV.ONEAUTH_URL}/login/google/v2?client=hiring-blocks&redirect_uri=${ENV.PUBLIC_URL}`
  }

  @dropTask sendOTPTask = function* () {
    this.set('otpId', null)
    this.set('errorMessage', null)
    yield this.api.post('/login/otp/email', {
      data: {
        email: this.email
      }
    }).then(response => {
      this.set('otpId', response.id)
    }).catch(({ response, jqXHR, payload }) => {
      if (payload) {
        this.set('errorMessage', payload.errors[0].title)
      }
    })
  }

  @dropTask verifyOTPTask = function* () {
    try {
      this.set('errorMessage', null)
      yield this.api.post('/login/otp/email/verify', {
        data: {
          email: this.email,
          otp: this.otp,
          otp_id: this.otpId
        }
      }).catch(({ response, jqXHR, payload }) => {
        if (payload) {
          throw(new Error(payload.errors[0].title))
        }
      })

      this.session.validate()
      this.router.transitionTo('application')
    } catch(err) {
      this.set('errorMessage', err.message)
    }
  }
}
