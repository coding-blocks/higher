import DS from 'ember-data';
import env from 'hiring-front/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: env.apiHost

});
