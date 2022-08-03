import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  fresherBranches: {
    description: 'Branches',
    validators: [
      validator('has-many'),
      validator('presence', {
        disabled: Ember.computed('model.experienceType', function () {
          return this.model.experienceType !== 'fresher'
        }),
        presence: Ember.computed('model.experienceType', function () {
          return this.model.experienceType === 'fresher'
        }),
      })
    ]
  },
  fresherGraduationYear: {
    description: 'Graduation Year',
    validators: [
      validator('presence', {
        disabled: Ember.computed('model.experienceType', function () {
          return this.model.experienceType !== 'fresher'
        }),
        presence: Ember.computed('model.experienceType', function () {
          return this.model.experienceType === 'fresher'
        })
      })
    ]
  },
  title: {
    description: 'Title',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  joiningThreshold: {
    description: 'Notice Period',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  // ctc: {
  //   description: 'CTC',
  //   validators: [
  //     validator('presence', {
  //       presence: true
  //     })
  //   ]
  // },
  description: {
    description: 'Description',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  locations: {
    description: 'Locations',
    validators: [
      validator('has-many'),
      validator('presence', {
        presence: true
      })
    ]
  },
  company: {
    description: 'Company',
    validators: [
      validator('belongs-to'),
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
        presence: true
      })
    ]
  },
  deadline: {
    description: 'Job Deadline',
    validators: [
      validator('presence', {
        presence: Ember.computed('model.isStudent', function () {
          return !this.get('model.isStudent')
        }).volatile()
      }),
      validator('date')
    ]
  },
  postedOn: {
    description: 'Posted On',
    validators: [
      validator('presence', {
        presence: Ember.computed('model.isStudent', function () {
          return !this.get('model.isStudent')
        }).volatile()
      }),
      validator('date')
    ]
  },
  minExperience: {
    description: 'Minimum Experience',
    validators: [
      validator('number', {
        integer: true,
        gte: 0
      }),
      validator('number', {
        lte: Ember.computed('model.maxExperience', function () {
          return this.model.maxExperience
        }),
        message: 'Minimum Experience should be atmost Maximum Experience'
      }),
      validator('presence', {
        disabled: Ember.computed('model.experienceType', function () {
          return this.model.experienceType !== 'experienced'
        }),
        presence: Ember.computed('model.experienceType', function () {
          return this.model.experienceType === 'experienced'
        })
      })
    ]
  },
  maxExperience: {
    description: 'Maximum Experience',
    validators: [
      validator('number', {
        integer: true
      }),
      validator('number', {
        gte: Ember.computed('model.minExperience', function () {
          return this.model.minExperience
        }),
        message: 'Maximum Experience should be atleast equal Minimum Experience'
      }),
      validator('presence', {
        disabled: Ember.computed('model.experienceType', function () {
          return this.model.experienceType !== 'experienced'
        }),
        presence: Ember.computed('model.experienceType', function () {
          return this.model.experienceType === 'experienced'
        })
      })
    ]
  },
  minCtc: {
    description: 'Minimum CTC',
    validators: [
      validator('number', {
        gte: 0
      }),
      validator('number', {
        lte: Ember.computed('model.maxCtc', function () {
          return this.model.maxCtc
        }),
        message: 'Minimum CTC should be atmost Maximum CTC'
      }),
      validator('presence', {
        presence: true
      })
    ]
  },
  maxCtc: {
    description: 'Maximum CTC',
    validators: [
      validator('number', {
        gte: Ember.computed('model.minCtc', function () {
          return this.model.minCtc
        }),
        message: 'Maximum CTC should be atleast equal Minimum CTC'
      }),
      validator('presence', {
        presence: true
      })
    ]
  }
})

export default DS.Model.extend(Validations, {
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
  joiningThreshold: DS.attr('number'),
  isAccepting: DS.attr(),
  isCbOnly: DS.attr('boolean'),
  coverImage: DS.attr(),
  experienceType: DS.attr(),
  deadline: DS.attr(),
  deadlineString: Ember.computed('deadline', {
    get() {
      return moment.unix(this.get('deadline')).toDate()
    },
    set(key, val) {
      this.set('deadline', moment(val).unix())
      return val
    }
  }),
  hasDeadlinePassed: Ember.computed('deadline', function () {
    return moment().isAfter(moment.unix(this.deadline))
  }),
  postedOn: DS.attr(),
  postedOnString: Ember.computed('postedOn', {
    get() {
      return moment.unix(this.get('postedOn')).toDate()
    },
    set(key, val) {
      this.set('postedOn', moment(val).unix())
      return val
    }
  }),
  form: DS.attr(),
  formJSON: Ember.computed('form', function () {
    return JSON.parse(this.form)
  }),
  skills: DS.hasMany('skill'),
  minCtc: DS.attr('number'),
  minCtcString: Ember.computed('minCtc', {
    get() {
      return this.get('minCtc')
    },
    set(key, val) {
      this.set('minCtc', val ? +val : null)
      return val
    }
  }),
  maxCtc: DS.attr('number'),
  maxCtcString: Ember.computed('maxCtc', {
    get() {
      return this.get('maxCtc')
    },
    set(key, val) {
      this.set('maxCtc', val ? +val : null)
      return val
    }
  }),
  minExperience: DS.attr('number'),
  minExperienceString: Ember.computed('minExperience', {
    get() {
      return this.get('minExperience')
    },
    set(key, val) {
      this.set('minExperience', val ? +val : null)
      return val
    }
  }),
  maxExperience: DS.attr('number'),
  maxExperienceString: Ember.computed('maxExperience', {
    get() {
      return this.get('maxExperience')
    },
    set(key, val) {
      this.set('maxExperience', val ? +val : null)
      return val
    }
  }),
  locations: DS.hasMany('location'),
  company: DS.belongsTo('company'),
  applicationsCount: DS.attr(),
  recruiterProfile: DS.belongsTo('recruiter-profile'),
  myApplication: DS.belongsTo('job-application', { inverse: null }),
  jobApplications: DS.hasMany('job-application', { inverse: 'job' }),
  jobRoles: DS.hasMany('job-role'),
  skills: DS.hasMany('skill'),
  fresherBranches: DS.hasMany('branch'),
});
