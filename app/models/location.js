import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  applicantProfile: DS.belongsTo('applicant-profile', { inverse: 'currentLocation' })
});
