import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllSubpack, deleteSubpack } from "./FetchApi";
import moment from "moment";
import { SubpackContext } from "./index";

const apiURL = process.env.REACT_APP_API_URL;

const AllSubpack = (props) => {
  const { data, dispatch } = useContext(SubpackContext);
  const { subpacks } = data;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllSubpack();
    console.log(responseData);
    setTimeout(() => {
      if (responseData && responseData.Subpacks) {
        dispatch({
          type: "fetchSubpacksAndChangeState",
          payload: responseData.Subpacks,
        });
        setLoading(false);
      }
    }, 1000);
  };

  const deleteSubpackReq = async (pId) => {
    let deleteC = await deleteSubpack(pId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch Subpack context */
  const editSubpack = (pId, subpack, type) => {
    if (type) {
      dispatch({
        type: "editSubpackModalOpen",
        subpack: { ...subpack, pId: pId },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
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
              <th className="px-4 py-2 border">Subpack</th>
              {/* <th className="px-4 py-2 border">Price</th> */}
              {/* <th className="px-4 py-2 border">Description</th> */}
              {/* <th className="px-4 py-2 border">Image</th> */}
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Product Name</th>
          

              <th className="px-4 py-2 border">Credits</th>
              <th className="px-4 py-2 border">Offer(in %)</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subpacks && subpacks.length > 0 ? (
              subpacks.map((item, key) => {
                return (
                  <SubpackTable
                    subpack={item}
                    editSubpack={(pId, subpack, type) =>
                      editSubpack(pId, subpack, type)
                    }
                    deleteSubpack={(pId) => deleteSubpackReq(pId)}
                    key={key}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-xl text-center font-semibold py-8"
                >
                  No subpack found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {subpacks && subpacks.length} subpack found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Subpack Component */
const SubpackTable = ({ subpack, deleteSubpack, editSubpack }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-center">
          {/* {subpack.pName.length > 15
            ? subpack.pDescription.substring(1, 15) + "..."
            : subpack.pName} */}
            {subpack.pName} 
        </td>
      
        {/* <td className="p-2 text-center">
          <img
            className="w-12 h-12 object-cover object-center"
            src={`${apiURL}/uploads/subpacks/${subpack.pImages[0]}`}
            alt="pic"
          />
        </td> */}
        {/* <td className="p-2 text-center">
          {subpack.pStatus === "Active" ? (
            <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
              {subpack.pStatus}
            </span>
          ) : (
            <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
              {subpack.pStatus}
            </span>
          )}
          {subpack.pName}
        </td> */}
        <td className="p-2 text-center">{subpack.pCategory.cName}</td>
        <td className="p-2 text-center">{subpack.pProduct.pName}</td>
        <td className="p-2 text-center">{subpack.pCredits}</td>
        <td className="p-2 text-center">{subpack.pOffer}%</td>
        <td className="p-2 text-center">
          {moment(subpack.createdAt).format("lll")}
        </td>
        <td className="p-2 text-center">
          {moment(subpack.updatedAt).format("lll")}
        </td>
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={(e) => editSubpack(subpack._id, subpack, true)}
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
            onClick={(e) => deleteSubpack(subpack._id)}
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

export default AllSubpack;
