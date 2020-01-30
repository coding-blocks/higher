import DS from 'ember-data';

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
  postedOn: DS.attr(),
  isAccepting: DS.attr(),
  coverImage: DS.attr(),
  form: DS.attr(),
  companyProfile: DS.belongsTo('company-profile'),
  myApplication: DS.belongsTo('job-application', {inverse: null}),
  jobApplications: DS.hasMany('job-application', { inverse: 'job' })
});
