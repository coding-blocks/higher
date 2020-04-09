import Component from '@ember/component';
import layout from '../templates/components/w-tab-nav';
import { later } from '@ember/runloop';

export default class WTabNavComponent extends Component {
  layout = layout

  constructor() {
    super(...arguments)

    if(!this.currentTab) {
      later(() => {
        this.set('currentTab', this.tabs.firstObject)
      })
    }
  }
}
