export const SHOW_INCOME_MODAL = "SHOW_INCOME_MODAL"
export const HIDE_INCOME_MODAL = "HIDE_INCOME_MODAL"

export function showIncomeModal() {
    return {
        type: SHOW_INCOME_MODAL
    }
  };
  
  export function hideIncomeModal() {
    return {
        type: HIDE_INCOME_MODAL
    }
  };