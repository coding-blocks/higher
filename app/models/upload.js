import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend( {
  url: DS.attr(),
  type: DS.attr(),
  isVerified: DS.attr('boolean'),
  isHidden: DS.attr('boolean'),
  verifiedById: DS.attr('number'),
  logoUpload: DS.belongsTo('company'),
  videoUpload: DS.belongsTo('company'),
  brochureUpload: DS.belongsTo('company'),
})