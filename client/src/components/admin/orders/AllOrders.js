import React, { useState, Fragment, useContext, useEffect } from "react";
import moment from "moment";

import { OrderContext } from "./index";
import { fetchData, editOrderReq, deleteOrderReq } from "./Actions";

import eye from "../../../assets/eye.png";
import { editOrder } from "./FetchApi";
import Axios from "axios";
import { getAllDelboy } from "../delboy/FetchApi";

const apiURL = process.env.REACT_APP_API_URL;

const AllCategory = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const { orders, loading } = data;

  useEffect(() => {
    fetchData(dispatch);
  }, []);

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
              <th className="px-4 py-2 border">Sr No.</th>
              <th className="px-4 py-2 border">Customer</th>

              <th className="px-4 py-2 border">Order Details</th>

              <th className="px-4 py-2 border">Status</th>
              {/* <th className="px-4 py-2 border">Assigned</th> */}
              <th className="px-4 py-2 border">Assign to</th>

              {/* <th className="px-4 py-2 border">Total</th> */}
              {/* <th className="px-4 py-2 border">Transaction Id</th> */}
              {/* <th className="px-4 py-2 border">Email</th> */}
              <th className="px-4 py-2 border">Created at</th>

              {/* <th className="px-4 py-2 border">Delivery Date</th> */}
              {/* <th className="px-4 py-2 border">Address</th> */}
              {/* <th className="px-4 py-2 border">Updated at</th> */}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((item, i) => {
                return (
                  <CategoryTable
                    key={i}
                    order={item}
                    srNo={i}
                    // editOrder={(oId, type, status,assignTo) =>
                    //   editOrderReq(oId, type, status, dispatch,assignTo)
                    // }
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="text-xl text-center font-semibold py-8"
                >
                  No order found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {orders && orders.length} order found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Category Component */
const CategoryTable = ({ order, srNo }) => {
  const { dispatch } = useContext(OrderContext);
  // console.log(order);

  const [added, setAdded] = useState(false);
  const [delboy, setDelboy] = useState([]);
  const [datasend, setDatasend] = useState({
    oId: order._id,
    status: order.status,
    _id: order.assignTo,
  });
  const [showAssignee, setShowAssignee] = useState("");
  const getAllDelboy = async () => {
    try {
      let res = await Axios.get(`${apiURL}/api/delboy/all-delboy`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDelboys = async () => {
    let responseData = await getAllDelboy();
    //  console.log(responseData.Delboy)

    setDelboy(responseData.Delboy);
  };

  const getSelected = (id) => {
    // console.log(id);
    if (id === "") {
      setShowAssignee("NA");
    } else {
      Axios.post(`${apiURL}/api/delboy/single-delboy`, { uId: id })
        .then((res) => setShowAssignee(res.data.Delboy.delname))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    fetchDelboys();
    // getSelected(datasend.assignTo);
  }, [datasend]);
  const editOrder = (datasend) => {
    // console.log(datasend);
    if (datasend.assignTo !== "NA") {
      // console.log(datasend);
      Axios.post(`${apiURL}/api/order/update-order`, datasend)
        .then((res) => {
          // console.log(res.data);
          // console.log("working");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Errorr");
    }
  };

  const assignOrder = (datasend) => {
    if (datasend && order.assignAction === "false") {
      // console.log(datasend);
      let data = {
        assignAction:"true",
        pOrder: order._id,
        status: "Processing",
        _id: datasend.assignTo,
      };
      // console.log(data);
      Axios.post(`${apiURL}/api/delboy/edit-delboy-by-order`, data)
        .then((res) => {
          console.log(res.data);
          // console.log("working");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Errorr");
    }
  };

  const DeleteDeliveryBoy = (id,delboyId) => {
    let data = {
      assignAction:"false",
      pOrder: id,
      _id:delboyId,
      status: "Not processed",
    };
    Axios.post(`${apiURL}/api/delboy/edit-delboy-by-order`, data)
      .then((res) => {
        // console.log(res.data);
        // console.log("working");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <tr className="border-b">
        {/* <td className="hover:bg-gray-200 p-2 text-center">
          ID{order._id.slice(-7).toUpperCase() || ""}
        </td> */}
        <td className="hover:bg-gray-200 p-2 text-center">{srNo + 1}</td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {order.user.name || ""}
        </td>
        <td className="w-48 hover:bg-gray-200 p-2 flex flex-col space-y-1">
          {order.allProduct.map((product, index) => {
            return (
              <>
                <div key={index}></div>
                <span className="block flex items-center space-x-2" key={index}>
                  {/* <img
                  className="w-8 h-8 object-cover object-center"
                  src={`${apiURL}/uploads/products/${product.productId.pImages[0]}`}
                  alt="productImage"
                />  */}
                  <span>
                    {product.productId.pName}
                    <span>
                      ({product.value}
                      {product.unit})
                    </span>
                  </span>
                  <span>x {product.quantity}</span>
                </span>
              </>
            );
          })}
        </td>

        <td className="hover:bg-gray-200 p-2 text-center cursor-default">
          {order.status === "Not processed" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Processing" && (
            <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Shipped" && (
            <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Delivered" && (
            <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
          {order.status === "Cancelled" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {order.status}
            </span>
          )}
        </td>

        {/* <td className="text-center">{showAssignee}</td> */}
        <td className="text-center">
          {order.assignAction === "true" ? (
            <>
              <div>{order.assignTo.delname}</div>
              <button
                type="button"
                className="focus:outline-none"
                onClick={() => {
                  // editOrder(datasend)
                  // setAdded(!added);
                  DeleteDeliveryBoy(order._id,datasend._id);
                  setDatasend({ assignTo: null });
                }}
                style={{
                  backgroundColor: "red",
                  color: "black",
                  padding: "5px",
                }}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <select
                // value={order.assignTo}
                onChange={(e) => {
                  // editOrder(order._id,dispatch,order.status,order.assignTo)
                  setDatasend({ ...datasend, assignTo: e.target.value });
                }}
                name="variantunit"
                className="px-1 py-1 border focus:outline-none"
                id="variantunit"
              >
                {delboy.length > 0 &&
                  delboy.map((item, index) => {
                    return (
                      <option key={index} name="status" value={item._id}>
                        {item.delname}
                      </option>
                    );
                  })}
                {/* <option name="status" value="">
                    Select unit
                  </option>
                  <option name="status" value="units">
                    units
                  </option> */}
              </select>
              <button
                type="button"
                className="focus:outline-none"
                onClick={() => {
                  // editOrder(datasend);
                  assignOrder(datasend);
                  // setAdded(!added);
                }}
                style={{
                  backgroundColor: "#303031",
                  color: "white",
                  padding: "5px",
                }}
              >
                Add
              </button>
            </>
          )}
        </td>
        {/* <td className="hover:bg-gray-200 p-2 text-center">
          ${order.amount}.00
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {order.transactionId}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">{order.user.name}</td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {order.user.email}
        </td> */}
        {/* <td className="hover:bg-gray-200 p-2 text-center">{order.status}</td> */}
        {/* <td className="hover:bg-gray-200 p-2 text-center">{order.address}</td> */}
        <td className="hover:bg-gray-200 p-2 text-center">
          {moment(order.createdAt).format("lll")}
        </td>
        {/* <td className="hover:bg-gray-200 p-2 text-center">
          {moment(order.updatedAt).format("lll")}
        </td> */}
        <td className="p-2 flex items-center justify-center">
          {/* <span
            onClick={(e) => editOrder(order._id, true, order.status)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <img src={eye} style={{ width: "23px", height: "23px" }} alt='eyeicon' />
          </span>
          <span
            onClick={(e) => editOrder(order._id, true, order.status)}
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
          </span> */}
          <span
            onClick={(e) => deleteOrderReq(order._id, dispatch)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllCategory;
