import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    description: 'Title',
    validators: [
      validator('presence', {
        presence: true,
        message: 'College cannot be empty'
      })
    ]
  },
  subtitle: {
    description: 'Subtitle',
    validators: [
      validator('presence', {
        presence: true,
        message: 'Field of Study cannot be empty'
      })
    ]
  },
  startYear: {
    description: 'Start Year',
    validators: [
      validator('date'),
      validator('presence', {
        presence: true
      })
    ]
  },
  endYear: {
    description: 'End Year',
    validators: [
      validator('date'),
      validator('presence', {
        presence: Ember.computed('model.isCurrent', function () {
          return !this.get('model.isCurrent')
        })
      })
    ]
  }
})

export default DS.Model.extend(Validations, {
  title: DS.attr(),
  subtitle: DS.attr(),
  startYear: DS.attr(),
  endYear: DS.attr(),
  location: DS.attr(),
  type: DS.attr(),
  description: DS.attr(),
  isCurrent: DS.attr('boolean'),
  isCurrentSetter: Ember.computed('isCurrent', {
    get() {
      return this.isCurrent
    },
    set(key, val) {
      if (val) {
        this.set('endYear', null)
      }
      this.set('isCurrent', val)
      return val
    }
  }),
  applicantProfile: DS.belongsTo('applicant-profile')
});
