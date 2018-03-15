export const ADD_TXN = 'ADD_TXN'

export function addTxn(props) {
    return {
        type: ADD_TXN,
        budgetId: props.budgetId,
        amount: props.amount,
        desc: props.desc || ''
    }
  };