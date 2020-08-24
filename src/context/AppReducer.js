export default (state, action) => {
  switch (action.type) {
    case "GET_DELIVERIES":
      return {
        ...state,
        loading: false,
        deliveries: action.payload,
      };
    case "SET_MAP_CENTER":
      return {
        ...state,
        mapCenter: action.payload,
      };
    case "SET_LOADER":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
