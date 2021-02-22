export const delboyState = {
    delboyS: [],
    addDelboyModal: false,
    editDelboyModal: {
      modal: false,
      uId: null,
      delname: "",
      delphone: ""
    },
    loading: false,
  };
  
  export const delboyReducer = (state, action) => {
    switch (action.type) {
      /* Get all Delboy */
      case "fetchDelboyAndChangeState":
        return {
          ...state,
          delboyS: action.payload,
        };
      /* Create a Delboy */
      case "addDelboyModal":
        return {
          ...state,
          addDelboyModal: action.payload,
        };
      /* Edit a Delboy */
      case "editDelboyModalOpen":
        return {
          ...state,
          editDelboyModal: {
            modal: true,
            uId: action.uId,
            delphone: action.delphone,
            delname: action.delname,
            delpassword: action.delpassword,
          },
        };
      case "editDelboyModalClose":
        return {
          ...state,
          editDelboyModal: {
            modal: false,
            uId: null,
            delphone: "",
            delname: "",
          },
        };
      case "loading":
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
  };
  