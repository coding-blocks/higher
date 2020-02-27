import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import getCourseTypes from 'hiring-front/utils/course-types';
import { dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';

export default class ApplicantCourseEditor extends Component {
  @service store

  @alias('fetchOnlineCoursesTask.lastSuccessful.value') onlineCourses
  @alias('fetchSkillsTask.lastSuccessful.value') skills

  organizations = ['Coding Blocks', 'Other']
  showValidationMessages = false
  selectedCourseType = null
  selectedOnlineCourse = null

  courseTypes = getCourseTypes()

  @computed('editingRecord.organizationType', 'editingRecord.courseMode')
  get isCBOnlineCourse() {
    return this.get('editingRecord.organizationType') === 'codingblocks'
  }

  didReceiveAttrs() {
    this._super(...arguments)

    this.fetchOnlineCoursesTask.perform();
    this.fetchSkillsTask.perform();
  }

  @dropTask fetchOnlineCoursesTask = function* () {
    return yield this.store.findAll('course')
  }

  @dropTask fetchSkillsTask = function* () {
    return yield this.store.query('skill', { filter: { "status =": 'published' } })
  }

  @dropTask saveRecordTask = function* () {
    if (this.editingRecord.validations.isInvalid) {
      this.set('showValidationMessages', true)
      return
    }

    yield this.get('editingRecord').save()
    this.onAfterSave()
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
    this.editingRecord.set('skill', courseType)
    this.editingRecord.set('logo', courseType.name[0].toUpperCase())
    this.editingRecord.set('name', courseType.name)
    this.set('selectedCourseType', courseType.name)
  }

  willDestroyElement() {
    if(this.editingRecord.hasDirtyAttributes){
      this.editingRecord.destroyRecord()
    }
    this._super(...arguments)
  }
}
