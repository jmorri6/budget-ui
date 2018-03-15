import { combineReducers } from 'redux'
import showAddTxnReducer from './show-add-txn-reducer'
import addTxnReducer from './add-txn-reducer'
import incomeModalReducer from './income-modal-reducer'
import showConfirmationReducer from './confirmation-modal-reducer'


const rootReducer = combineReducers({
  showAddTxn: showAddTxnReducer,
  addTxn: addTxnReducer,
  incomeModal: incomeModalReducer,
  showConfirmation: showConfirmationReducer
})
  
export default rootReducer