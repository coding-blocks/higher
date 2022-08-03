import Service from '@ember/service';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'hiring-front/config/environment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default AjaxService.extend({
  session: service(),
  host: ENV.API_HOST,
  contentType: 'application/json; charset=utf-8',
  headers: computed('session.data.token', function () {
    let headers = {"Content-Type": "application/json"};
    const jwt = this.get('session.data.token');
    if (jwt) {
      headers['Authorization'] = `JWT ${jwt}`;
    }
    return headers;
  }),
  options() {
    const res = this._super(...arguments)
    res.xhrFields = {
      withCredentials: true,
    }
    return res
  }
});