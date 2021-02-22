import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;
const Headers = () => {
  return {
    headers: {
      token: `Bearer ${BearerToken()}`,
    },
  };
};

export const getAllDelboy = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/delboy/all-delboy`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createDelboy = async ({
  delname,delphone,delpassword
}) => {
  // let formData = new FormData();
  // formData.append("dellname", cImage);
  // formData.append("cName", cName);
  // formData.append("cDescription", cDescription);
  // formData.append("cStatus", cStatus);
let dataObj={delname,delphone,delpassword}
  try {
    let res = await axios.post(
      `${apiURL}/api/delboy/add-delboy`,
      dataObj,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editDelboy = async (uId,delname, delphone, delpassword) => {
  let data = { uId: uId, delname:delname, delphone: delphone, delpassword: delpassword };
  console.log(data)
  try {
    let res = await axios.post(
      `${apiURL}/api/delboy/edit-delboy`,
      data,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDelboy = async (uId) => {
  try {
    let res = await axios.post(
      `${apiURL}/api/delboy/delete-delboy`,
      { uId },
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
