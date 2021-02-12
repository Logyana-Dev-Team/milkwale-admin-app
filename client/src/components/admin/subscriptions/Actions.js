import { getAllSubscription, deleteSubscription } from "./FetchApi";

export const fetchData = async (dispatch) => {
  dispatch({ type: "loading", payload: true });
  let responseData = await getAllSubscription();
  setTimeout(() => {
    if (responseData && responseData.Subscription) {
      dispatch({
        type: "fetchSubscriptionAndChangeState",
        payload: responseData.Subscription,
      });
      dispatch({ type: "loading", payload: false });
    }
  }, 1000);
};

/* This method call the editmodal & dispatch category context */
export const editSubscriptionReq = (oId, type, status, dispatch) => {
  if (type) {
    console.log("click update");
    dispatch({ type: "updateSubscriptionModalOpen", oId: oId, status: status });
  }
};

export const deleteSubscriptionReq = async (oId, dispatch) => {
  let responseData = await deleteSubscription(oId);
  console.log(responseData);
  if (responseData && responseData.success) {
    fetchData(dispatch);
  }
};

/* Filter All Subscription */
export const filterSubscription = async (
  type,
  data,
  dispatch,
  dropdown,
  setDropdown
) => {
  let responseData = await getAllSubscription();
  if (responseData && responseData.Subscription) {
    let newData;
    if (type === "All") {
      dispatch({
        type: "fetchSubscriptionAndChangeState",
        payload: responseData.Subscription,
      });
      setDropdown(!dropdown);
    } else if (type === "Not processed") {
      newData = responseData.Subscription.filter(
        (item) => item.status === "Not processed"
      );
      dispatch({ type: "fetchSubscriptionAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Processing") {
      newData = responseData.Subscription.filter(
        (item) => item.status === "Processing"
      );
      dispatch({ type: "fetchSubscriptionAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Shipped") {
      newData = responseData.Subscription.filter((item) => item.status === "Shipped");
      dispatch({ type: "fetchSubscriptionAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Delivered") {
      newData = responseData.Subscription.filter(
        (item) => item.status === "Delivered"
      );
      dispatch({ type: "fetchSubscriptionAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Cancelled") {
      newData = responseData.Subscription.filter(
        (item) => item.status === "Cancelled"
      );
      dispatch({ type: "fetchSubscriptionAndChangeState", payload: newData });
      setDropdown(!dropdown);
    }
  }
};
