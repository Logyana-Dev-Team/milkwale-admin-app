import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import SubscriptionMenu from "./SubscriptionMenu";
import AllSubscriptions from "./AllSubscriptions";
import { subscriptionState, subscriptionReducer } from "./SubscriptionContext";

/* This context manage all of thesubscription orders component's data */
export const SubscriptionContext = createContext();

const SubscriptionComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <SubscriptionMenu />
      <AllSubscriptions />
    </div>
  );
};

const Subscriptions = (props) => {
  const [data, dispatch] = useReducer(subscriptionReducer, subscriptionState);
  return (
    <Fragment>
      <SubscriptionContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<SubscriptionComponent />} />
      </SubscriptionContext.Provider>
    </Fragment>
  );
};

export default Subscriptions;
