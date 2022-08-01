import Service from '@ember/service';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'hiring-front/config/environment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default AjaxService.extend({
  session: service(),
  host: ENV.API_HOST,
  contentType: 'application/json; charset=utf-8',
  headers: computed('session.data.authenticated.jwt', function () {
    let headers = {"Content-Type": "application/json"};
    const jwt = this.get('session.data.authenticated.jwt');
    if (jwt) {
      headers['Authorization'] = `JWT ${jwt}`;
    }
    return headers;
  })
});