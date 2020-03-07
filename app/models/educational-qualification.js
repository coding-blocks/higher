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
        message: Ember.computed('model.type', function() {
          const educationalQualificationType = this.get('model.type')
          if(educationalQualificationType == 'x_secondary' || educationalQualificationType == 'xii_senior_secondary') {
            return 'School name cannot be empty'
          } else {
            return 'College name cannot be empty'
          }
        })
      })
    ]
  },
  type: {
    description: 'Type',
    validators: [
      validator('presence', {
        presence: true,
        message: 'Qualification Type cannot be empty'
      })
    ]
  },
  subtitle: {
    description: 'Subtitle',
    validators: [
      validator('presence', {
        presence: Ember.computed('model.type', function() {
          return this.model.type != 'x_secondary'
        }),
        message: 'Branch cannot be empty'
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
      validator('date', {
        after: Ember.computed('model.startYear', function() {
          return this.get('model.startYear')
        }),
        message: 'End Year must be after Start Year'
      }),
      validator('presence', {
        presence: true
      })
    ]
  },
  performanceScore: {
    validators: [
      validator('number', {
        allowString: true,
        lte: Ember.computed('model.performanceScale', function() {
          return this.get('model.performanceScale') === 'percentage' ? 100 : 10
        }).volatile()
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
  isOtherCollege: DS.attr(),
  performanceScale: DS.attr(),
  performanceScore: DS.attr('number'),
  isOtherCollegeSetter: Ember.computed('isOtherCollege', {
    get() {
      return this.isOtherCollege
    },
    set(key, val) {
      this.set('isOtherCollege', val)
      this.set('title', null)
      return val
    }
  }),
  applicantProfile: DS.belongsTo('applicant-profile')
});
