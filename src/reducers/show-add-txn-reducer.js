import {SHOW_ADD_TXN, HIDE_ADD_TXN} from '../actions/add-txn-modal.js'

export default function showAddTxnReducer(
    state = {
      isOpen: false,
      name: '',
      requireDesc: false
    },
    action
  ) {
    switch (action.type) {
    case SHOW_ADD_TXN:
      return Object.assign({}, state, {
        isOpen: true,
        name: action.name,
        requireDesc: action.requireDesc
      })
    case HIDE_ADD_TXN:
      return Object.assign({}, state, {
        isOpen: false
      })
    default:
      return state
    }
  }