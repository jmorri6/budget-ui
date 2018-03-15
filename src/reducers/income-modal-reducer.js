import {SHOW_INCOME_MODAL, HIDE_INCOME_MODAL} from '../actions/income-modal.js'

export default function incomeModalReducer(
    state = {
        isOpen: false
    },
    action
  ) {
    switch (action.type) {
    case SHOW_INCOME_MODAL:
      return Object.assign({}, state, {
          isOpen: true
      })
    case HIDE_INCOME_MODAL:
    return Object.assign({}, state, {
        isOpen: false
    })
    default:
      return state
    }
  }