import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  hackerBlocksContestId: DS.attr('number'),
  score: DS.attr('number'),
  verified: DS.attr('boolean'),
  applicantProfile: DS.belongsTo('applicant-profile'),
  skill: DS.belongsTo('skill')
})
