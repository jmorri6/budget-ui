import { SHOW_ERROR, HIDE_ERROR } from '../actions/errors.js'

export default function errorsReducer(
    state = {
        isOpen: false,
        errorMessage: ''
    },
    action
  ) {
    switch (action.type) {
    case SHOW_ERROR:
      return Object.assign({}, state, {
          isOpen: true,
          errorMessage: action.errorMessage
      })
    case HIDE_ERROR:
    return Object.assign({}, state, {
        isOpen: false,
        errorMessage: ''
    })
    default:
      return state
    }
  }