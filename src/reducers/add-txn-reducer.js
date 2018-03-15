import {ADD_TXN} from '../actions/add-txn.js'

export default function addTxnReducer(
    state = {
      budgetId: 0,
      amount: 0,
      desc: ''
    },
    action
  ) {
    switch (action.type) {
    case ADD_TXN:
      return Object.assign({}, state, {
        budgetId: action.budgetId,
        amount: action.amount,
        desc: action.desc,
      })
    default:
      return state
    }
  }