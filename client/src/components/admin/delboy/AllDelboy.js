import React, { Fragment, useContext, useEffect } from "react";
import { getAllDelboy, deleteDelboy, editDelboy } from "./FetchApi";
import { DelboyContext } from "./index";
import moment from "moment";

const apiURL = process.env.REACT_APP_API_URL;

const AllDelboy = (props) => {
  const { data, dispatch } = useContext(DelboyContext);
  const { delboyS, loading } = data;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    let responseData = await getAllDelboy();
    console.log(responseData);
    setTimeout(() => {
      if (responseData.Delboys) {
        dispatch({
          type: "fetchDelboyAndChangeState",
          payload: responseData.Delboys,
        });
        dispatch({ type: "loading", payload: false });
      }
    }, 1000);
  };

  const deleteDelboyReq = async (uId) => {
    let deleteC = await deleteDelboy(uId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch Delboy context */
  const editDelboy = (uId, type, delname, delphone, delpassword) => {
    if (type) {
      dispatch({
        type: "editDelboyModalOpen",
        uId: uId,
        delname: delname,
        delphone: delphone,
        delpassword: delpassword,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          class="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name </th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Password</th>
              {/* <th className="px-4 py-2 border">Status</th> */}
              {/* <th className="px-4 py-2 border">Created at</th> */}
              {/* <th className="px-4 py-2 border">Updated at</th> */}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {delboyS && delboyS.length > 0 ? (
              delboyS.map((item, key) => {
                return (
                  <DelboyTable
                    delboy={item}
                    editDelboy={(uId, type, delname, delphone, delpassword) =>
                      editDelboy(uId, type, delname, delphone, delpassword)
                    }
                    deleteDelboy={(uId) => deleteDelboyReq(uId)}
                    key={key}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-xl text-center font-semibold py-8"
                >
                  No Delboy found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {delboyS && delboyS.length} Delboy found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Delboy Component */
const DelboyTable = ({ delboy, deleteDelboy, editDelboy }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-center">
          {/* {delboy.delname.length > 20
            ? delboy.delname.slice(0, 20) + "..."
            : delboy.delname} */}
          {delboy.delname}
        </td>
        <td className="p-2 text-center">
          {/* {delboy.cDescription.length > 30
            ? delboy.cDescription.slice(0, 30) + "..."
            : delboy.cDescription} */}
          {delboy.delphone}
        </td>
        {/* <td className="p-2 text-center">
          <img
            className="w-12 h-12 object-cover object-center"
            src={`${apiURL}/uploads/delboyS/${delboy.cImage}`}
            alt=""
          />
        </td> */}
        {/* <td className="p-2 text-center">
          {delboy.cStatus === "Active" ? (
            <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
              {delboy.cStatus}
            </span>
          ) : (
            <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
              {delboy.cStatus}
            </span>
          )}
        </td> */}
        <td className="p-2 text-center">{delboy.delpassword}</td>
        {/*  <td className="p-2 text-center">
          {moment(delboy.updatedAt).format("lll")}
        </td> */}
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={(e) =>
              editDelboy(
                delboy._id,
                true,
                delboy.delname,
                delboy.delphone,
                delboy.delpassword
              )
            }
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={(e) => deleteDelboy(delboy._id)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllDelboy;
