import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import getCourseTypes from 'hiring-front/utils/course-types';
import { dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';

export default class ApplicantCourseEditor extends Component {
  @service store

  @alias ('fetchOnlineCoursesTask.lastSuccessful.value') onlineCourses

  organizations = ['Coding Blocks', 'Other']
  showValidationMessages = false
  selectedCourseType = null
  selectedOnlineCourse = null

  courseTypes = getCourseTypes()

  @computed('editingRecord.organizationType', 'editingRecord.courseMode')
  get isCBOnlineCourse() {
    return this.get('editingRecord.organizationType') === 'codingblocks'
  }

  didInsertElement() {
    const newRecord = this.getNewApplicantCourse()
    this.set('editingRecord', newRecord)
  }
  
  didReceiveAttrs() {
    this._super(...arguments) 
    
    this.fetchOnlineCoursesTask.perform();
    
    //because no two updates in a single render
    // later(() => {
      // }, 0)
  }
    
  getNewApplicantCourse() {
    return this.get('getNewRecord')('applicant-course', {
      isVerified: false,
      courseMode: 'offline',
    })
  }

  @dropTask fetchOnlineCoursesTask = function *() {
    return yield this.store.findAll('course')
  }

  @dropTask saveRecordTask = function* () {
    if (this.editingRecord.validations.isInvalid) {
      this.set('showValidationMessages', true)
      return
    }

    this.get('editingRecord').save()
      .then(r => {
        const newRecord = this.getNewApplicantCourse()
        this.set('showValidationMessages', false)
        return this.set('editingRecord', newRecord)
      })
  }

  @action
  setOnlineCourse(onlineCourse) {
    this.set('selectedOnlineCourse', onlineCourse)
    
    const editingRecord = this.get('editingRecord')
    editingRecord.set('name', onlineCourse.get('title'))
    editingRecord.set('logo', onlineCourse.get('logo'))
    editingRecord.set('amoebaCourseId', onlineCourse.get('id'))
  }

  @action
  setCourseType(courseType) {
    this.set('selectedCourseType', courseType)
    this.set('editingRecord.logo', courseType.logo)
    this.set('editingRecord.name', courseType.title)
  }

  willDestroyElement() {
    this.editingRecord.destroyRecord()
    this._super(...arguments)
  }
}
