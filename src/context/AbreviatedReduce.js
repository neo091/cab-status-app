export function abreviatedReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_ABREVIATED":
      return {
        ...state,
        abreviated: !state.abreviated,
      }
    case "SET_ABREVIATED":
      return {
        ...state,
        abreviated: action.payload,
      }
    default:
      return state
  }
}
