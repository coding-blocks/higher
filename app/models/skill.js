import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  isVerifiable: DS.attr('boolean'),
  status: DS.attr(),
  skillTests: DS.hasMany('skill-test'),
  applicantProfileSkill:DS.belongsTo('applicant-profile-skill')
})