export const SHOW_ADD_TXN = 'SHOW_ADD_TXN';
export const HIDE_ADD_TXN = 'HIDE_ADD_TXN';

export function showAddTxnModal(props) {
    return {
        type: SHOW_ADD_TXN,
        name: props.name,
        requireDesc: props.requireDesc,
        budgetId: props.budgetId
    }
  };
  
  export function hideAddTxnModal() {
    return {
        type: HIDE_ADD_TXN
    }
  };