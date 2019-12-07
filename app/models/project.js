import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
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
