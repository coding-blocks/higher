import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr(),
  applicationForm: DS.attr(),
  applicantProfile: DS.belongsTo('applicantProfile'),
  job: DS.belongsTo('job')
})