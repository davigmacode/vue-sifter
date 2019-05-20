import date from './date'
import number from './number'
import string from './string'

class Filters {

  defaults () {
    return {
      date: true,
      number: true,
      string: true
    }
  }

  install (Vue, options = {}) {
    // merge defaults with options
    this.options = Object.assign(this.defaults(), options)

    // creates a instance method that can be used inside of a Vue component
    Vue.prototype.$filters = {}

    if (this.options.date) {
      Vue.prototype.$filters.date = date
      Vue.filter('date', date)
    }

    if (this.options.number) {
      Vue.prototype.$filters.number = number
      Vue.filter('number', number)
    }

    if (this.options.string) {
      Object.keys(string).forEach(key => {
        Vue.prototype.$filters[key] = string[key]
        Vue.filter(key, string[key])
      })
    }
  }
}

export default new Filters()
