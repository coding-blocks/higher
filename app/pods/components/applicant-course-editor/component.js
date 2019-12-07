import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service'; 

export default class ApplicantCourseEditor extends Component {
  @service store

  organizations = ['Coding Blocks', 'Other']


  @computed('editingRecord.organizationType', 'editingRecord.courseMode')
  get isCBOnlineCourse(){
    const organizationType = this.get('editingRecord.organizationType')
    const courseMode = this.get('editingRecord.courseMode')
    return courseMode === 'online' && organizationType === 'codingblocks'
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
      courseMode: 'online',
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
    console.log(course)
    const editingRecord = this.get('editingRecord')
    editingRecord.set('name', course.get('title'))
    editingRecord.set('logo', course.get('logo'))
    editingRecord.set('amoebaCourseId', course.get('id'))
  }
}
