import { CATEGORIES_RETRIEVED } from '../actions/categories.js'

export default function categoriesRetrievedReducer(
    state = {
      categories: []
    },
    action
  ) {
    switch (action.type) {
    case CATEGORIES_RETRIEVED:
      return Object.assign({}, state, {
        categories: action.categories
      })
    default:
      return state
    }
  }