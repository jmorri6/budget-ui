import {SHOW_CONFIRMATION, HIDE_CONFIRMATION} from '../actions/confirmation-modal.js'

export default function incomeModalReducer(
    state = {
        isOpen: false,
        title: '',
        text: '',
        okCallback: null
    },
    action
  ) {
    switch (action.type) {
    case SHOW_CONFIRMATION:
      return Object.assign({}, state, {
          isOpen: true,
          title: action.title,
          text: action.text,
          okCallback: action.okCallback
      })
    case HIDE_CONFIRMATION:
    return Object.assign({}, state, {
        isOpen: false
    })
    default:
      return state
    }
  }