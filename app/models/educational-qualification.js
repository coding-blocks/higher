import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  title: DS.attr(),
  subtitle: DS.attr(),
  startYear: DS.attr(),
  endYear: DS.attr(),
  isCurrent: DS.attr(),
  location: DS.attr(),
  type: DS.attr(),
  description: DS.attr(),
  studentProfile: DS.belongsTo('student-profile')
});
