import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  title: DS.attr(),
  logo: DS.attr(),
  location: DS.attr(),
  description: DS.attr(),
  role: DS.attr(),
  type: DS.attr(),
  eligibility: DS.attr(),
  ctc: DS.attr(),
  status: DS.attr(),
  experience: DS.attr(),
  deadline: DS.attr(),
  hasDeadlinePassed: Ember.computed('deadline', function() {
    return moment().isAfter(moment.unix(this.deadline))
  }),
  postedOn: DS.attr(),
  isAccepting: DS.attr(),
  coverImage: DS.attr(),
  form: DS.attr(),
  locations: DS.hasMany('location'),
  company: DS.belongsTo('company'),
  myApplication: DS.belongsTo('job-application', {inverse: null}),
  jobApplications: DS.hasMany('job-application', { inverse: 'job' })
});
