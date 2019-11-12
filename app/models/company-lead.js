import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr(),
  mobile: DS.attr(),
  email: DS.attr(),
  companyName: DS.attr(),
  hiringPosition: DS.attr()
});
