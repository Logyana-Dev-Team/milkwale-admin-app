import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { createProduct, getAllProduct, editProductbyVariant } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";

const AddProductDetail = ({ categories }) => {
  const { data, dispatch } = useContext(ProductContext);
  const [showImages, setShowImages] = useState([]);
  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-1 px-4 w-full`}>{msg}</div>
  );
  const [variant, setVariant] = useState({
    value: 0,
    unit: "",
  });
  const [fData, setFdata] = useState({
    pName: "",
    pDescription: "",
    pStatus: "Active",
    pImage: null, // Initial value will be null or empty array
    pCategory: "",
    pPrice: 0,
    pOffer: 0,
    pQuantity: 0,
    pVariant: [],
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
      }
    }, 1000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    e.target.reset();
    if (!fData.pImage) {
      setFdata({ ...fData, error: "Please upload at least 2 image" });
      setTimeout(() => {
        setFdata({ ...fData, error: false });
      }, 2000);
    }

    try {
      let responseData = await createProduct(fData);
      // let updateVariants= await editProductbyVariant(responseData.data)
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          pName: "",
          pDescription: "",
          pImage: "",
          pStatus: "Active",
          pCategory: "",
          pPrice: 0,
          pQuantity: 0,
          pOffer: 0,
          pVariant: [],
          success: responseData.success,
          error: false,
        });
        setTimeout(() => {
          setFdata({
            ...fData,
            pName: "",
            pDescription: "",
            pImage: "",
            pStatus: "Active",
            pCategory: "",
            pPrice: 0,
            pQuantity: 0,
            pOffer: 0,
            pVariant: [],
            success: false,
            error: false,
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
      setShowImages([]);
    } catch (error) {
      console.log(error);
    }
  };

  const submitVariant = () => {
    console.log(variant);
    setFdata({ ...fData, pVariant: [...fData.pVariant, variant] });
    console.log(fData);
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "addProductModal", payload: false })}
        className={`${
          data.addProductModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addProductModal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-y-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "addProductModal", payload: false })
              }
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
          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert(fData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-2">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Category *</label>
                <select
                  value={fData.pCategory}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pCategory: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-1 border focus:outline-none"
                  id="status"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.length > 0
                    ? categories.map(function (elem) {
                        return (
                          <option name="status" value={elem._id} key={elem._id}>
                            {elem.cName}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>

              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={fData.pName}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pName: e.target.value,
                    })
                  }
                  className="px-4 py-1 border focus:outline-none"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Product Description *</label>
              <textarea
                value={fData.pDescription}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pDescription: e.target.value,
                  })
                }
                className="px-4 py-1 border focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={2}
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex flex-col mt-4">
              <label htmlFor="image">
                Product Images *
                <span className="text-gray-600 text-xs">
                  Upload at least 2 images
                </span>
              </label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  onChange={(e) => {
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pImage: [...e.target.files],
                    });
                    setShowImages([...showImages, ...e.target.files]);
                  }}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="px-1 py-1 border focus:outline-none"
                  style={{ width: "40%" }}
                  id="image"
                  multiple
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  {showImages &&
                    showImages.map((item, index) => {
                      return (
                        <div key={index}>
                          <img
                            src={URL.createObjectURL(item)}
                            style={{ width: "35px", height: "35px" }}
                            alt="NoImages"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Status *</label>
                <select
                  value={fData.pStatus}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pStatus: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-1 border focus:outline-none"
                  id="status"
                >
                  <option name="status" value="Active">
                    Active
                  </option>
                  <option name="status" value="Disabled">
                    Disabled
                  </option>
                </select>
              </div>

              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="price">Product Price *</label>
                <input
                  value={fData.pPrice}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-1 border focus:outline-none"
                  id="price"
                />
              </div>
            </div>

            {/* <div className="flex space-x-1 py-1"> */}
            <div className="w-100 flex flex-col space-y-1 space-x-1">
              <label htmlFor="variantval">Select Variant*</label>
              <div className="w-100 flex flex-row space-x-1">
                <input
                  value={variant.value || 0}
                  onChange={(e) => {
                    setVariant({ ...variant, value: e.target.value });
                  }}
                  type="number"
                  className="px-2 py-1 border focus:outline-none w-1/4"
                  id="variantvalue"
                />
                <select
                  value={variant.unit || ""}
                  onChange={(e) => {
                    setVariant({ ...variant, unit: e.target.value });
                  }}
                  name="variantunit"
                  className="px-2 py-1 border focus:outline-none"
                  id="variantunit"
                >
                  <option name="status" value="" selected multiple>
                    Select unit
                  </option>
                  <option name="status" value="Ltr.">
                    Ltr.
                  </option>
                  <option name="status" value="ml">
                    ml
                  </option>
                  <option name="status" value="Kg">
                    Kg
                  </option>
                  <option name="status" value="gm">
                    gm
                  </option>
                  <option name="status" value="units">
                    units
                  </option>
                </select>

                <button
                  className="btn btn-sm"
                  type="button"
                  onClick={(e) => {
                    submitVariant();
                    document.getElementById("variantvalue").value = 0;
                    document.getElementById("variantunit").value = "";
                  }}
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {fData.pVariant.map((item, index) => {
                  return <div key={index}>{`${item.value} ${item.unit}`}</div>;
                })}
              </div>
            </div>

            {/* <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Select variant unit *</label>
              
              </div> */}

            {/* </div> */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="quantity">Product in Stock *</label>
                <input
                  value={fData.pQuantity}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-1 border focus:outline-none"
                  id="quantity"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="offer">Product Offer (%) *</label>
                <input
                  value={fData.pOffer}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pOffer: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-1 border focus:outline-none"
                  id="offer"
                />
              </div>
            </div>
            <div
              className="flex flex-col space-y-1 w-full mt-4"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <button
                style={{ background: "#303031", margin: "5px", width: "30%" }}
                type="submit"
                className=" bg-gray-800 text-gray-100 text-lg font-medium py-1"
              >
                Create product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const AddProductModal = (props) => {
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const [allCat, setAllCat] = useState({});

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      setAllCat(responseData.Categories);
    }
  };

  return (
    <Fragment>
      <AddProductDetail categories={allCat} />
    </Fragment>
  );
};

export default AddProductModal;
