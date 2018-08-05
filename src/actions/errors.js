export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

export function displayError(msg) {
    return {
        type: SHOW_ERROR,
        errorMessage: msg
    }
}

export function hideError() {
    return {
        type: HIDE_ERROR
    }
}