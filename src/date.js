import format from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

/**
 * format date to string
 *
 * @param {val}
 * @param {template}
 * @return {string}
 */
const date = (val, template) => {
  template = template || 'MMM Do YYYY, h:mm a'
  return template === 'relative' ? distanceInWordsToNow(val) : format(val, template)
}

export default date
