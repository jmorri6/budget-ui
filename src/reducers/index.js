import { combineReducers } from 'redux'
import addTxnReducer from './add-txn-reducer'


const rootReducer = combineReducers({
  addTxn: addTxnReducer,
})
  
export default rootReducer