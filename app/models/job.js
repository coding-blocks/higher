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
  minCtc: DS.attr(),
  maxCtc: DS.attr(),
  status: DS.attr(),
  minExperience: DS.attr(),
  maxExperience: DS.attr(),
  experience: DS.attr(),
  experienceType: DS.attr(),
  deadline: DS.attr(),
  postedOn: DS.attr(),
  isAccepting: DS.attr(),
  isCbOnly: DS.attr('boolean'),
  coverImage: DS.attr(),
  locations: DS.hasMany('location'),
  company: DS.belongsTo('company'),
  myApplication: DS.belongsTo('job-application', {inverse: null}),
  jobApplications: DS.hasMany('job-application', { inverse: 'job' }),
  hasDeadlinePassed: Ember.computed('deadline', function() {
    return moment().isAfter(moment.unix(this.deadline))
  }),
  form: DS.attr(),
  formJSON: Ember.computed('form', function () {
    return JSON.parse(this.form)
  }),
});
