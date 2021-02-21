import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllProduct = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/product/all-product`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPorductImage = async ({ pImage }) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
};

export const createProduct = async ({
  pName,
  pDescription,
  pImage,
  pStatus,
  pCategory,
  pQuantity,
  pPrice,
  pOffer,
  pVariant
}) => {
  
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
  formData.append("pName", pName);
  formData.append("pDescription", pDescription);
  formData.append("pStatus", pStatus);
  formData.append("pCategory", pCategory);
  formData.append("pQuantity", pQuantity);
  formData.append("pPrice", pPrice);
  formData.append("pOffer", pOffer);

  // for (const item of pVariant) {
  //   formData.append("pVariant", JSON.stringify(item));
  // }
  let i=0;
  // let allVariants=[];
for( i=0;i<pVariant.length; i++){
    formData.append("pVariant", JSON.stringify(pVariant[i]));

}
  // formData.append("pVariant", pVariant);

  try {
    let res = await axios.post(`${apiURL}/api/product/add-product`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (product) => {
  console.log(product);
  /* Most important part for updating multiple image  */
  let formData = new FormData();
  if (product.pEditImages) {
    for (const file of product.pEditImages) {
      formData.append("pEditImages", file);
    }
  }
  /* Most important part for updating multiple image  */
  formData.append("pId", product.pId);
  formData.append("pName", product.pName);
  formData.append("pDescription", product.pDescription);
  formData.append("pStatus", product.pStatus);
  formData.append("pCategory", product.pCategory._id);
  formData.append("pQuantity", product.pQuantity);
  formData.append("pPrice", product.pPrice);
  formData.append("pOffer", product.pOffer);
  formData.append("pImages", product.pImages);
  // formData.append("pVariant", product.pVariant);
  let i=0;
  // let allVariants=[];
for( i=0;i<product.pVariant.length; i++){
    formData.append("pVariant", JSON.stringify(product.pVariant[i]));

}

  try {
    let res = await axios.post(`${apiURL}/api/product/edit-product`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (pId) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/delete-product`, { pId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (catId) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/product-by-category`, {
      catId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByPrice = async (price) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/product-by-price`, {
      price,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProductbySubpack = async (product) => {
  console.log(product);
  /* Most important part for updating multiple image  */
  // let formData = new FormData();
  // if (product.pEditImages) {
  //   for (const file of product.pEditImages) {
  //     formData.append("pEditImages", file);
  //   }
  // }
  /* Most important part for updating multiple image  */
  // formData.append("pId", product.pId);
  // formData.append("pName", product.pName);
  // formData.append("pDescription", product.pDescription);
  // formData.append("pStatus", product.pStatus);
  // formData.append("pCategory", product.pCategory._id);
  // formData.append("pQuantity", product.pQuantity);
  // formData.append("pPrice", product.pPrice);
  // formData.append("pOffer", product.pOffer);
  // formData.append("pImages", product.pImages);

  try {
    let res = await axios.post(`${apiURL}/api/product/edit-product-by-subpack`, product);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
  export const editProductbyVariant = async (product) => {
    console.log(product);
 
    try {
      let res = await axios.post(`${apiURL}/api/product/edit-product-by-variant`, product);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  
};

export const getProductById = async (productId) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/single-product`, productId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};