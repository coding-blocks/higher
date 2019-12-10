import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service'; 
import getCourseTypes from 'hiring-front/utils/course-types';

export default class ApplicantCourseEditor extends Component {
  @service store

  organizations = ['Coding Blocks', 'Other']

  courseTypes = getCourseTypes()


  @computed('editingRecord.organizationType', 'editingRecord.courseMode')
  get isCBOnlineCourse(){
    return this.get('editingRecord.organizationType') === 'codingblocks'
  }

  didReceiveAttrs() {
    const onlineCourses = this.store.findAll('course')
    onlineCourses.then(r => {
      this.set('onlineCourses', onlineCourses.toArray())
    })

    //because no two updates in a single render
    later(() => {
      const newRecord = this.getNewApplicantCourse()
      this.set('editingRecord', newRecord)
    }, 0)
  }

  getNewApplicantCourse() {
    return this.get('getNewRecord')('applicant-course', {
      isVerified: false,
      courseMode: 'offline',
    })
  }

  @action 
  saveRecord() {
    this.get('editingRecord').save()
    .then(r => {
      const newRecord = this.getNewApplicantCourse()
      return this.set('editingRecord', newRecord)
    })
  }

  @action 
  setOnlineCourse(course){
    const editingRecord = this.get('editingRecord')
    editingRecord.set('name', course.get('title'))
    editingRecord.set('logo', course.get('logo'))
    editingRecord.set('amoebaCourseId', course.get('id'))
  }

  @action 
  setCourseType(courseType) {
    this.set('editingRecord.logo', courseType.logo)
    this.set('editingRecord.name', courseType.title)
  }

  willDestroyElement() {
    this._super(...arguments)
    this.editingRecord.destroyRecord()
  }
}
