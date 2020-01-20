import Component from '@ember/component';
import { action } from '@ember/object';

export default class WSelectorComponent extends Component {
  @action 
  changeSelected(item) {
    if(this.selected.includes(item)) {
      this.selected.removeObject(item)
    } else {
      this.selected.pushObject(item)
    }
  }
}
