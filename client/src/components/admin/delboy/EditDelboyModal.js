import React, { Fragment, useContext, useState, useEffect } from "react";
import { DelboyContext } from "./index";
import { editDelboy, getAllDelboy } from "./FetchApi";

const EditDelboyModal = (props) => {
  const { data, dispatch } = useContext(DelboyContext);

  const [delname, setDelname] = useState("");
  const [delphone, setDelphone] = useState("");
  const [delpassword, setDelpassword] = useState("");
  const [uId, setUid] = useState("");

  useEffect(() => {
    setDelname(data.editDelboyModal.delname);
    setDelphone(data.editDelboyModal.delphone);
    setDelpassword(data.editDelboyModal.delpassword);
    setUid(data.editDelboyModal.uId);
  }, [data.editDelboyModal.modal]);

  const fetchData = async () => {
    let responseData = await getAllDelboy();
    if (responseData) {
      dispatch({
        type: "fetchDelboyAndChangeState",
        payload: responseData,
      });
    }
  };

  const submitForm = async () => {
    dispatch({ type: "loading", payload: true });
    let edit = await editDelboy(uId, delname,delphone,delpassword);
    if (edit.error) {
      console.log(edit.error);
      dispatch({ type: "loading", payload: false });
    } else if (edit.success) {
      console.log(edit.success)
      dispatch({ type: "editDelboyModalClose" });
      setTimeout(() => {
        fetchData();
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "editDelboyModalClose" })}
        className={`${
          data.editDelboyModal.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.editDelboyModal.modal ? "" : "hidden"
        } fixed inset-0 m-4  flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Delboy
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) => dispatch({ type: "editDelboyModalClose" })}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>

          <div className="flex flex-col space-y-1 w-full py-4">
              <label htmlFor="name">Delboy Name</label>
              <input
                onChange={(e) =>setDelname(e.target.value)
                }
                value={delname}
                className="px-4 py-2 border focus:outline-none"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full py-4">
              <label htmlFor="phone">Delboy Phone</label>
              <input
                 onChange={(e) =>setDelphone(e.target.value)
                 }
                 value={delphone}
                className="px-4 py-2 border focus:outline-none"
                type="number"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full py-4">
              <label htmlFor="password">Delboy password</label>
              <input
                onChange={(e) =>setDelpassword(e.target.value)
                }
                value={delpassword}
                className="px-4 py-2 border focus:outline-none"
                type="text"
                
              />
            </div>
          {/* <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="description">Delboy Name</label>
            <textarea
              value={delname}
              onChange={(e) => setDelname(e.target.value)}
              className="px-4 py-2 border focus:outline-none"
              name="description"
              id="description"
              cols={5}
              rows={5}
            />
          </div> */}
          {/* <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="status">Delboy Phone</label>
            <select
              value={delphone}
              name="status"
              onChange={(e) => setDelphone(e.target.value)}
              className="px-4 py-2 border focus:outline-none"
              id="status"
            >
              <option name="status" value="Active">
                Active
              </option>
              <option name="status" value="Disabled">
                Disabled
              </option>
            </select>
          </div> */}
          <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6">
            <button
              style={{ background: "#303031" }}
              onClick={(e) => submitForm()}
              className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
            >
             Update Delboy
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditDelboyModal;
