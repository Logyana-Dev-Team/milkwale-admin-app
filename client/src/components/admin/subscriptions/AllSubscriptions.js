import React, { Fragment, useContext, useEffect, useState } from "react";
import moment from "moment";

import { SubscriptionContext } from "./index";
import {
  fetchData,
  editSubscriptionReq,
  deleteSubscriptionReq,
} from "./Actions";
import Axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

const AllCategory = (props) => {
  const { data, dispatch } = useContext(SubscriptionContext);
  const { subscriptions, loading } = data;

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
              {/* <th className="px-4 py-2 border">Products</th> */}
              {/* <th className="px-4 py-2 border">Subscription Id</th> */}
              <th className="px-4 py-2 border">Customer</th>

              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Status</th>

              <th className="px-4 py-2 border">Assign To</th>
              {/* <th className="px-4 py-2 border">Transaction Id</th> */}
              {/* <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Address</th> */}
              <th className="px-4 py-2 border">Morning Time</th>
              <th className="px-4 py-2 border">Evening Time</th>
              {/* <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th> */}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions && subscriptions.length > 0 ? (
              subscriptions.map((item, i) => {
                return (
                  <CategoryTable
                    key={i}
                    subscription={item}
                    editSubscription={(oId, type, status) =>
                      editSubscriptionReq(oId, type, status, dispatch)
                    }
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="text-xl text-center font-semibold py-8"
                >
                  No Subscriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {subscriptions && subscriptions.length} subscription found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Category Component */
const CategoryTable = ({ subscription, editSubscription }) => {
  const { dispatch } = useContext(SubscriptionContext);
  const [delboy, setDelboy] = useState([]);
  const [datasend, setDatasend] = useState({
    oId: subscription._id,
    status: subscription.status,
    _id: subscription.assignTo,
  });
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

  useEffect(() => {
    fetchDelboys();
    // getSelected(datasend.assignTo);
  }, [datasend]);

  const assignOrder = (datasend) => {
    if (datasend && subscription.assignAction === "false") {
      // console.log(datasend);
      let data = {
        assignAction: "true",
        pSubscription: subscription._id,
        status: "Processing",
        _id: datasend.assignTo,
      };
      console.log(data);
      Axios.post(`${apiURL}/api/delboy/edit-delboy-by-subscription-order`, data)
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

  const DeleteDeliveryBoy = (id, delboyId) => {
    let data = {
      assignAction: "false",
      pSubscription: id,
      _id: delboyId,
      status: "Not processed",
    };
    Axios.post(`${apiURL}/api/delboy/edit-delboy-by-subscription-order`, data)
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
        {/* <td className="w-48 hover:bg-gray-200 p-2 flex flex-col space-y-1">
          {subscription.allProduct.map((product, i) => {
            return (
              <span className="block flex items-center space-x-2" key={i}>
                <img
                  className="w-8 h-8 object-cover object-center"
                  src={`${apiURL}/uploads/products/${product.subId.pImages[0]}`}
                  alt="productImage"
                />
                <span>{product.subId.pName}</span>
                <span>{product.quantitiy}x</span>
              </span>
            );
          })} 
        </td>*/}
        {/* <td className="hover:bg-gray-200 p-2 text-center">ID{subscription._id.slice(-5).toUpperCase()}</td> */}
        <td className="hover:bg-gray-200 p-2 text-center">
          {subscription.user.name}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {subscription.subscriptionProduct.subId.pName}
        </td>

        <td className="hover:bg-gray-200 p-2 text-center cursor-default">
          {subscription.status === "Not processed" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {subscription.status}
              {console.log(subscription)}
            </span>
          )}
          {subscription.status === "Processing" && (
            <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
              {subscription.status}
            </span>
          )}
          {subscription.status === "Shipped" && (
            <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
              {subscription.status}
            </span>
          )}
          {subscription.status === "Delivered" && (
            <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
              {subscription.status}
            </span>
          )}
          {subscription.status === "Cancelled" && (
            <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
              {subscription.status}
            </span>
          )}
        </td>
        {/* <td className="hover:bg-gray-200 p-2 text-center">
          ${subscription.amount}.00
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {subscription.transactionId}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">{subscription.user.name}</td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {subscription.user.email}
        </td> */}
        {/* <td className="hover:bg-gray-200 p-2 text-center">{subscription.phone}</td> */}
        {/* <td className="hover:bg-gray-200 p-2 text-center">{subscription.address}</td> */}
        <td className="text-center">
          {subscription.assignAction === "true" ? (
            <>
              <div>{subscription.assignTo.delname}</div>
              <button
                type="button"
                className="focus:outline-none"
                onClick={() => {
                  // editOrder(datasend)
                  // setAdded(!added);
                  DeleteDeliveryBoy(subscription._id, datasend._id);
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
        <td className="hover:bg-gray-200 p-2 text-center">
          {subscription.morningTime}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {subscription.eveningTime}
        </td>
        {/* <td className="hover:bg-gray-200 p-2 text-center">
          {moment(subscription.createdAt).format("lll")}
        </td>
        <td className="hover:bg-gray-200 p-2 text-center">
          {moment(subscription.updatedAt).format("lll")}
        </td> */}
        <td className="p-2 flex items-center justify-center">
          <span
            onClick={(e) =>
              editSubscription(subscription._id, true, subscription.status)
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
            onClick={(e) => deleteSubscriptionReq(subscription._id, dispatch)}
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
