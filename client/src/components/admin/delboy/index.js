import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import DelboyMenu from "./DelboyMenu";
import AllDelboy from "./AllDelboy";
import { delboyState, delboyReducer } from "./DelboyContext";

/* This context manage all of the delivery boy component's data */
export const DelboyContext = createContext();

const DelboyComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <DelboyMenu />
      <AllDelboy />
    </div>
  );
};

const Delboy = (props) => {
  const [data, dispatch] = useReducer(delboyReducer, delboyState);
  return (
    <Fragment>
      <DelboyContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<DelboyComponent />} />
      </DelboyContext.Provider>
    </Fragment>
  );
};

export default Delboy;
