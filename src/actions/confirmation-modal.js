export const SHOW_CONFIRMATION = "SHOW_CONFIRMATION"
export const HIDE_CONFIRMATION = "HIDE_CONFIRMATION"

export function showConfirmation(props) {
    return {
        type: SHOW_CONFIRMATION,
        title: props.title,
        text: props.text,
        okCallback: props.okCallback
    }
  };
  
  export function hideConfirmation() {
    return {
        type: HIDE_CONFIRMATION
    }
  };