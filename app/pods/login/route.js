import Route from '@ember/routing/route';
import ENV from 'hiring-front/config/environment'
import { getPublicUrl } from "hiring-front/utils/browser"


export default class LoginRoute extends Route {
  loginUrl = `${ENV.ONEAUTH_URL}/oauth/authorize?response_type=code&client_id=${ENV.CLIENT_ID}&redirect_uri=${getPublicUrl()}`
  
  activate() {
    window.location.href = this.loginUrl
  }
}