export const configReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PHONE":
      return {
        ...state,
        phone: action.payload,
      }
    case "TOGGLE_ABREVIATED":
      return {
        ...state,
        abreviated: !state.abreviated,
      }
    default:
      return state
  }
}
