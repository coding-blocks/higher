import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  logo: DS.attr(),
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
  logoUpload: DS.belongsTo('upload', { inverse: null }),
  videoUpload: DS.belongsTo('upload', { inverse: null }),
  brochureUpload: DS.belongsTo('upload', { inverse: null })
});
