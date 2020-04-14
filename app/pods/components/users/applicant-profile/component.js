import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';

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

  @dropTask generatePdfTask = function *() {
    try {
      $('html').css('font-size', '10px')
      $('.gradient-orange').addClass('orange')
      $('.gradient-orange').removeClass('gradient-orange')
      const options = {
        margin: [0.1, 0.3, 0.1, 0.3],
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          dpi: 192,
          scale: 2,
          letterRendering: true,
          imageTimeout: 0,
          useCORS: true,
          ignoreElements: (element) => element.classList.contains('ignore-in-pdf'),
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'portrait',
          compress: true,
        }
      }
      
      yield html2pdf()
      .from(this.element)
      .set(options)
      .save(`${this.currentUser.user.firstname}_${this.currentUser.user.lastname}`)
      .then(() => {
        $('html').css('font-size', '14px')
        $('.orange').addClass('gradient-orange')
        $('.gradient-orange').removeClass('orange')
      })
    } catch(err) {
      console.error('canvas error', err)
    }
  }

  @dropTask toggleProfileIsActiveTask = function *() {
    this.profile.toggleProperty('isActive')
    yield this.profile.save()
  }
}
