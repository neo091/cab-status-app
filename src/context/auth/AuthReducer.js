export const authReducer = (state, action) => {
  switch (action.type) {
    case "INIT_LOGIN":
      return {
        ...state,
        loading: true,
        user: null,
      }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      }
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}
