import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllSubpack = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/subpack/all-subpack`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createSubpackImage = async ({ pImage }) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
};

export const createSubpack = async ({
  pName,
  pProduct,
  pImage,
  pCategory,
  pCredits,
  pPrice,
  pOffer,
}) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
  formData.append("pName", pName);
  formData.append("pProduct", pProduct);
  // formData.append("pStatus", pStatus);
  formData.append("pCategory", pCategory);
  formData.append("pCredits", pCredits);
  formData.append("pPrice", pPrice);
  formData.append("pOffer", pOffer);

  try {
    let res = await axios.post(`${apiURL}/api/subpack/add-subpack`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editSubpack = async (subpack) => {
  console.log(subpack);
  /* Most important part for updating multiple image  */
  let formData = new FormData();
  if (subpack.pEditImages) {
    for (const file of subpack.pEditImages) {
      formData.append("pEditImages", file);
    }
  }
  /* Most important part for updating multiple image  */
  formData.append("pId", subpack.pId);
  formData.append("pName", subpack.pName);
  formData.append("pProduct", subpack.pProduct);
  // formData.append("pStatus", subpack.pStatus);
  formData.append("pCategory", subpack.pCategory._id);
  formData.append("pCredits", subpack.pCredits);
  formData.append("pPrice", subpack.pPrice);
  formData.append("pOffer", subpack.pOffer);
  formData.append("pImages", subpack.pImages);

  try {
    let res = await axios.post(`${apiURL}/api/subpack/edit-subpack`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubpack = async (pId) => {
  try {
    let res = await axios.post(`${apiURL}/api/subpack/delete-subpack`, { pId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const subpackByCategory = async (catId) => {
  try {
    let res = await axios.post(`${apiURL}/api/subpack/subpack-by-category`, {
      catId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const subpackByPrice = async (price) => {
  try {
    let res = await axios.post(`${apiURL}/api/subpack/subpack-by-price`, {
      price,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
