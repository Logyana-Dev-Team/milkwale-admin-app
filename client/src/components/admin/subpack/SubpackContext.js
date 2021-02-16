export const subpackState = {
  subpacks: null,
  addSubpackModal: false,
  editSubpackModal: {
    modal: false,
    pId: "",
    pName: "",
    // pDescription: "",
    // pImages: null,
    pStatus: "",
    pCategory: "",
    pProduct: "",
    pCredits: 0,
    // pPrice: "",
    pOffer: 0,
  },
};

export const subpackReducer = (state, action) => {
  switch (action.type) {
    /* Get all product */
    case "fetchSubpacksAndChangeState":
      return {
        ...state,
        subpacks: action.payload,
      };
    /* Create a product */
    case "addSubpackModal":
      return {
        ...state,
        addSubpackModal: action.payload,
      };
    /* Edit a Subpack */
    case "editSubpackModalOpen":
      return {
        ...state,
        editSubpackModal: {
          modal: true,
          pId: action.subpack.pId,
          pName: action.subpack.pName,
          // pDescription: action.subpack.pDescription,
          // pImages: action.subpack.pImages,
          pStatus: action.subpack.pStatus,
          pCategory: action.subpack.pCategory,
          pProduct: action.subpack.pProduct,
          pCredits: action.subpack.pCredits,
          // pPrice: action.subpack.pPrice,
          pOffer: action.subpack.pOffer,
        },
      };
    case "editSubpackModalClose":
      return {
        ...state,
        editSubpackModal: {
          modal: false,
          pId: "",
          pName: "",
          // pDescription: "",
          // pImages: null,
          pProduct:"",
          pStatus: "",
          pCategory: "",
          pCredits: 0,
          // pPrice: "",
          pOffer: 0,
        },
      };
    default:
      return state;
  }
};
