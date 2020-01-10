import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    description: 'Title',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  subtitle: {
    description: 'Subtitle',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  startDate: {
    description: 'Start Date',
    validators: [
      validator('date'),
      validator('presence', {
        presence: true
      })
    ]
  },
  endDate: {
    description: 'End Date',
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
  startDate: DS.attr(),
  endDate: DS.attr(),
  startDateString: Ember.computed('startDate', {
    get() {
      return moment.unix(this.get('startDate')).toDate()
    },
    set(key, val) {
      this.set('startDate', moment(val).unix())
      return moment(val)
    }
  }),
  endDateString: Ember.computed('endDate','isCurrent', {
    get() {
      return moment.unix(this.get('endDate')).toDate()
    },
    set(key, val) {
      if(this.get('isCurrent')){
        this.set('endDate', null)
      } else {
        this.set('endDate', moment(val).unix())
      }
      return moment(val)
    }
  }),
  isCurrent: DS.attr(),
  location:DS.attr(),
  type:DS.attr(),
  description:DS.attr(),
  applicantProfile: DS.belongsTo('applicant-profile')
});
