import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: {
    description: 'Name',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  description: {
    description: 'Company Description',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  website: {
    description: 'Website',
    validators: [
      validator('format', {
        type: 'url'
      })
    ]
  }
})

export default DS.Model.extend(Validations, {
  name: DS.attr(),
  logo: DS.attr(),
  website: DS.attr(),
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
  isActive: DS.attr(),
  coverImage: DS.attr(),
  form: DS.attr(),
  contacts: DS.attr(),
  contactsJSON: Ember.computed('contacts', function () {
    return JSON.parse(this.contacts)
  }),
  logoUpload: DS.belongsTo('upload', { inverse: null }),
  videoUpload: DS.belongsTo('upload', { inverse: null }),
  brochureUpload: DS.belongsTo('upload', { inverse: null }),
  jobs: DS.hasMany('job'),
  recruiterProfile: DS.belongsTo('recruiter-profile')
});
