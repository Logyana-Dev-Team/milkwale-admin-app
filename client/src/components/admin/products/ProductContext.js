export const productState = {
  products: null,
  addProductModal: false,
  editProductModal: {
    modal: false,
    pId: "",
    pName: "",
    pDescription: "",
    pImages: null,
    pStatus: "",
    pCategory: "",
    pQuantity: 0,
    pPrice: 0,
    pOffer: 0,
    pVariant:[]
  },
};

export const productReducer = (state, action) => {
  switch (action.type) {
    /* Get all product */
    case "fetchProductsAndChangeState":
      return {
        ...state,
        products: action.payload,
      };
    /* Create a product */
    case "addProductModal":
      return {
        ...state,
        addProductModal: action.payload,
      };
    /* Edit a product */
    case "editProductModalOpen":
      return {
        ...state,
        editProductModal: {
          modal: true,
          pId: action.product.pId,
          pName: action.product.pName,
          pDescription: action.product.pDescription,
          pImages: action.product.pImages,
          pStatus: action.product.pStatus,
          pCategory: action.product.pCategory,
          pQuantity: action.product.pQuantity,
          pPrice: action.product.pPrice,
          pOffer: action.product.pOffer,
          pVariant: action.product.pVariant,
        },
      };
    case "editProductModalClose":
      return {
        ...state,
        editProductModal: {
          modal: false,
          pId: "",
          pName: "",
          pDescription: "",
          pImages: null,
          pStatus: "",
          pCategory: "",
          pQuantity: 0,
          pPrice: 0,
          pOffer:0,
          pVariant:[]
        },
      };
    default:
      return state;
  }
};
