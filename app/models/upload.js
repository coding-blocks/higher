import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend( {
  url: DS.attr(),
  type: DS.attr(),
  isVerified: DS.attr(),
  verifiedById: DS.attr('number'),
  company: DS.belongsTo('company')
})