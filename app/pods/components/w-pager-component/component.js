import Component from '@ember/component';
import { action, computed } from '@ember/object';

export default class PagerComponent extends Component {
  currentPage = 0
  skippable = true
  pages = []

  @computed.alias('pages.length') totalPages

  didReceiveAttrs() {
    const pages = this.pages
    pages.map(p => this.skippable ? p.skippable = true : p.skippable = false)
    for (var i = 0; i < this.currentPage; i++) {
      pages[i].skippable = true
    }
  }

  setPage(page) {
    const pages = this.pages
    const currentPage = this.currentPage
    const prevToCurrentPage = page - 1 < 0 ? 0 : page - 1

    if (page < 0 || page > pages.length) {
      return
    }

    if (this.skippable || page < currentPage || pages[currentPage].skippable && pages[prevToCurrentPage].skippable) {
      this.set('currentPage', page)
    }
  }

  @action
  setCurrentPage(page) {
    this.setPage(page)
  }

  @action
  nextPage() {
    if(this.callOnNext) {
      this.callOnNext.perform(this.currentPage)
      .then(r => {
        this.pages[this.currentPage].skippable = true
        if (this.currentPage < this.totalPages - 1) {
          this.setCurrentPage(this.currentPage + 1)
        }
      })
      .catch(err => console.log('hihi',err))
    }

  }
}
