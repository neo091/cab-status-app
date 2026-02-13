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
    case "TOGGLE_WHATSAPP_REPORT":
      return {
        ...state,
        whatsAppReport: !state.whatsAppReport,
      }
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      }
    default:
      return state
  }
}
