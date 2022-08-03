import DS from 'ember-data';
import env from 'hiring-front/config/environment';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';


export default DS.JSONAPIAdapter.extend({
  session: service(),
  host: env.API_HOST,
  headers: computed('session.data.token', function () {
    let headers = {};
    console.log(this.get('session.data.token'))
    const jwt = this.get('session.data.token');
    if (jwt) {
      headers['Authorization'] = `JWT ${jwt}`;
    }
    return headers;
  }),
  urlForQueryRecord(query) {
    if (query.custom) {
      switch (query.custom.ext) {
        case 'url': {
          let url = query.custom.url;
          delete query.custom;
          return `${this._super(...arguments)}/${url}`;
        }
      }
    } else {
      return this._super(...arguments);
    }

  },
  urlForQuery(query) {
    if (query.custom) {
      switch (query.custom.ext) {
        case 'url': {
          let url = query.custom.url;
          delete query.custom;
          return `${this._super(...arguments)}/${url}`;
        }
      }
    } else {
      return this._super(...arguments);
    }
  }
});
