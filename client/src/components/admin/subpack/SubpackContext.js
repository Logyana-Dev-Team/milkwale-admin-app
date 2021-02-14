export const subpackState = {
  subpacks: null,
  addSubpackModal: false,
  editSubpackModal: {
    modal: false,
    pId: "",
    pName: "",
    pDescription: "",
    pImages: null,
    pStatus: "",
    pCategory: "",
    pQuantity: "",
    pPrice: "",
    pOffer: "",
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
          pDescription: action.subpack.pDescription,
          pImages: action.subpack.pImages,
          pStatus: action.subpack.pStatus,
          pCategory: action.subpack.pCategory,
          pQuantity: action.subpack.pQuantity,
          pPrice: action.subpack.pPrice,
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
          pDescription: "",
          pImages: null,
          pStatus: "",
          pCategory: "",
          pQuantity: "",
          pPrice: "",
          pOffer: "",
        },
      };
    default:
      return state;
  }
};
