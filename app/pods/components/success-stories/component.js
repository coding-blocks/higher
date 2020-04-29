import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { dropTask } from 'ember-concurrency-decorators';
import ENV from 'hiring-front/config/environment';

export default class SuccessStoriesComponent extends Component {
  @service ajax

  successStoriesUrl = ENV.SCATTERSHOT_API_HOST + '/public_stories?page[limit]=3&page[offset]=0'
  successStories = []

  didReceiveAttrs() {
    this._super(...arguments)

    this.fetchSuccessStoriesTask.perform()
  }

  @dropTask fetchSuccessStoriesTask = function *() {
    let response = yield this.ajax.request(this.successStoriesUrl)
    this.set('successStoriesUrl', response.links.next)
    response.results.forEach(story => {
      story.placements.every(placement => {
        if (placement.company.isTop) {
          story.company = placement.company
          story.type = 'placement'
          return false
        }
        return true
      })
      if(!story.company) {
        story.internships.every(internship => {
          if (internship.company.isTop) {
            story.company = internship.company
            story.type = 'internship'
            return false
          }
          return true
        })
      }
      if(!story.company) {
        if(story.placements.length) {
          story.company = story.placements[0].company
          story.type = 'placement'
        } else if (story.internships.length){
          story.company = story.internships[0].company
          story.type = 'internship'
        }
      }
    })
    this.successStories.pushObjects(response.results)
  }
}
