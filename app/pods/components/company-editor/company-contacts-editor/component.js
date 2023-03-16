import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { isArray } from '@ember/array';

export default class CompanyContactsEditor extends Component {
  didReceiveAttrs() {
    this._super(...arguments)
  }

  @action
  addContact() {
    isArray(this.contacts) ? this.contacts.pushObject({}) : this.set('contacts', [{}])
  }

  @action 
  removeContact(contact) {
    this.contacts.removeObject(contact)
  }
}
