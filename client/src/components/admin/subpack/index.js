import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import SubpackMenu from "./SubpackMenu";
import SubpackTable from "./SubpackTable";
import { subpackState, subpackReducer } from "./SubpackContext";

/* This context manage all of the Subpacks component's data */
export const SubpackContext = createContext();

const SubpackComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <SubpackMenu />
      <SubpackTable />
    </div>
  );
};

const Subpacks = (props) => {
  /* To use useReducer make sure that reducer is the first arg */
  const [data, dispatch] = useReducer(subpackReducer, subpackState);

  return (
    <Fragment>
      <SubpackContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<SubpackComponent />} />
      </SubpackContext.Provider>
    </Fragment>
  );
};

export default Subpacks;
