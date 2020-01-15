import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  currentLocation: {
    description: 'Current Location', 
    validators: [
      validator('belongs-to'),
      validator('presence', {
        presence: true,
        message: 'Its good to be a vagabond, but we need a location.'
      })
    ]
  },
  locations: {
    description: 'Preferred Locations',
    validators: [
      validator('has-many'),
      validator('presence', {
        presence: true
      })
    ]
  },
  jobRoles: {
    description: 'Job Roles',
    validators: [
      validator('has-many'),
      validator('presence', {
        presence: true,
        message: 'Select a job role.'
      })
    ]
  },
  currentCtc: {
    description: 'Current CTC',
    validators: [
      validator('number', {
        gt: 0
      }),
      validator('presence', {
        presence: Ember.computed('model.isStudent', function() {
          return !this.get('model.isStudent')
        }).volatile()
      })
    ]
  },
  expectedCtc: {
    description: 'Expected CTC',
    validators: [
      validator('number', {
        gt: 0
      }),
      validator('presence', {
        presence: Ember.computed('model.isStudent', function() {
          return !this.get('model.isStudent')
        }).volatile()
      })
    ]
  },
  joiningDate: {
    description: 'Joining Date',
    validators: [
      validator('date'),
      validator('presence', {
        presence: Ember.computed('model.isStudent', function() {
          return !this.get('model.isStudent')
        }).volatile()
      })
    ]
  }
})

export default DS.Model.extend(Validations, {
  about: DS.attr(),
  photo: DS.attr(),
  githubLink: DS.attr(),
  stackoverflowLink: DS.attr(),
  linkedinLink: DS.attr(),
  portfolioLink: DS.attr(),
  // links: Ember.computed('githubLink', 'stackoverflowLink', 'linkedinLink', 'portfolioLink', {
  //   get() {
  //     let links = {
  //       github: this.githubLink,
  //       stackoverflow: this.stackoverflowLink,
  //       linkedin: this.linkedinLink,
  //       portfolio: this.portfolioLink,
  //     }
  //     return JSON.stringify(links)
  //   },
  //   set(key, val) {

  //   }
  // }),PGPASSWORD=udpdg9xdltmsrgs1 psql -U doadmin -h db-postgresql-blr1-do-user-2270826-0.db.ondigitalocean.com -p 25060 -d oneauthdb --set=sslmode=require
  links: DS.attr(),
  isReviewed: DS.attr('boolean'),
  isActive: DS.attr('boolean'),
  expectedCtc: DS.attr('number'),
  expectedCtcString: Ember.computed('expectedCtc', {
    get() {
      return this.get('expectedCtc')
    },
    set(key, val) {
      this.set('expectedCtc', val ? +val : null)
      return val
    }
  }),
  currentCtc: DS.attr('number'),
  currentCtcString: Ember.computed('currentCtc', {
    get() {
      return this.get('currentCtc')
    },
    set(key, val) {
      this.set('currentCtc', val ? +val : null)
      return val
    }
  }),
  joiningDate: DS.attr('number'),
  joiningDateString: Ember.computed('joiningDate', {
    get() {
      return moment.unix(this.get('joiningDate')).toDate()
    },
    set(key, val) {
      this.set('joiningDate', moment(val).unix())
      return val
    }
  }),
  isStudent: DS.attr('boolean'),
  isStudentSetter: Ember.computed({
    get() {
      return this.get('isStudent')
    },
    set(key, val) {
      if(val) {
        this.set('currentCtc', null)
        this.set('expectedCtc', null)
        this.set('joiningDate', null)
      }
      this.set('isStudent', val)
      return val
    }
  }),
  jobRoles: DS.hasMany('job-role'),
  skills: DS.hasMany('skill'),
  applicantProfileSkills: DS.hasMany('applicant-profile-skill'),
  locations: DS.hasMany('location'),
  currentLocation: DS.belongsTo('location'),
  workExperiences: DS.hasMany('work-experience'),
  applicantCourses: DS.hasMany('applicant-course'),
  projects: DS.hasMany('project'),
  educationalQualifications: DS.hasMany('educational-qualification'),
  profileCompletion: DS.attr('number'),
  user: DS.belongsTo('user')
});
