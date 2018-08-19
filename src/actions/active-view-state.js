export const UPDATE_VIEW = "UPDATE_VIEW";

export function updateActiveView(active) {
    return {
        type: UPDATE_VIEW,
        active: active
    }
}