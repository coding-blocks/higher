import DS from 'ember-data';
import env from 'hiring-front/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';


export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
  session: service(),
  host: env.API_HOST,
  headers: computed('session.data.authenticated.jwt', function () {
    let headers = {};
    const jwt = this.get('session.data.authenticated.jwt');
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
