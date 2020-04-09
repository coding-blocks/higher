import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';
// import jspdf from 'jspdf';
// import html2canvas from 'html2canvas';

export default class ApplicantProfileComponent extends Component {
  @service currentUser

  @computed('currentUser')
  get userHimself() {
    return this.profile.get('user.id') === this.currentUser.get('user.id')
  }

  @computed('profile.links')
  get links() {
    return JSON.parse(this.profile.get('links'))
  }

  // @dropTask generatePdfTask = function *() {
  //   try {
  //     const doc = new jspdf()
  
  //     doc.html(this.element, {
  //       format: 'a4',
  //       orientation: 'portrait',
        
  //       callback: function (doc) {
  //         doc.save('Resume.pdf');
  //       }
  //     });
  //     // doc.fromHTML(this.element, 15, 15, {
  //     //   'width': 170,
  //     //   // 'elementHandlers': specialElementHandlers
  //     // });
  //     doc.save('resume.pdf')
  //   } catch(err) {
  //     console.log('canvas error', err)
  //   }
  // }

  @dropTask toggleProfileIsActiveTask = function *() {
    this.profile.toggleProperty('isActive')
    yield this.profile.save()
  }
}
