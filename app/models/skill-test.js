import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  hackerBlocksContestid: DS.attr('number'),
  passingThreshold: DS.attr('number'),
  skill: DS.belongsTo('skill')
})