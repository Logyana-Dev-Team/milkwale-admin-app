export const subscriptionState = {
    subscriptions: [],
    addCategoryModal: false,
    updateSubscriptionModal: {
      modal: false,
      oId: null,
      status: "",
    },
    loading: false,
  };
  
  export const subscriptionReducer = (state, action) => {
    switch (action.type) {
      /* Get all category */
      case "fetchSubscriptionAndChangeState":
        return {
          ...state,
          subscriptions: action.payload,
        };
      /* Create a category */
      case "addCategoryModal":
        return {
          ...state,
          addCategoryModal: action.payload,
        };
      /* Edit a category */
      case "updateSubscriptionModalOpen":
        return {
          ...state,
          updateSubscriptionModal: {
            modal: true,
            oId: action.oId,
            status: action.status,
          },
        };
      case "updateSubscriptionModalClose":
        return {
          ...state,
          updateSubscriptionModal: {
            modal: false,
            oId: null,
            status: "",
          },
        };
      case "loading":
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
  };
  