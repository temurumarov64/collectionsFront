import { apiRequest } from "./apiRequest";
import { BASE_URL } from "./baseUrl";

export const createCollectionApi = (
  name,
  description,
  theme,
  photo,
  extraFields
) => {
  const config = {
    method: "POST",
    url: `${BASE_URL}/api/v1/collections/create-collection`,
    data: {
      name,
      description,
      theme,
      photo,
      extraFields,
    },
    // headers: { "Content-Type": "multipart/form-data" },
  };
  return apiRequest(config);
};

export const getCollectionsApi = () => {
  const config = {
    method: "GET",
    url: `${BASE_URL}/api/v1/collections/all`,
  };
  return apiRequest(config);
};

export const getBiggestCollectionsApi = () => {
  const config = {
    method: "GET",
    url: `${BASE_URL}/api/v1/collections/biggest`,
  };
  return apiRequest(config);
};

export const getCollectionsByUserIdApi = () => {
  const config = {
    method: "GET",
    url: `${BASE_URL}/api/v1/collections/byUser`,
  };
  return apiRequest(config);
};

export const getCollectionsItemsByCollectionApi = (id) => {
  const config = {
    method: "GET",
    url: `${BASE_URL}/api/v1/collections/${id}/collection-items`,
  };
  return apiRequest(config);
};

export const getCollectionItemByIdApi = (id, collectionId) => {
  const config = {
    method: "GET",
    url: `${BASE_URL}/api/v1/collections/${collectionId}/collection-items/${id}`,
  };
  return apiRequest(config);
};

export const getAllExtraFieldsByCollectionIdApi = (id) => {
  const config = {
    method: "GET",
    url: `${BASE_URL}/api/v1/extraFields/${id}`,
  };
  return apiRequest(config);
};

export const createCollectionItemApi = (formData, id) => {
  const config = {
    method: "POST",
    url: `${BASE_URL}/api/v1/collections/${id}/create-item`,
    data: formData,
  };
  return apiRequest(config);
};

export const updateCollectionApi = (id, name, description, theme) => {
  const config = {
    method: "PUT",
    url: `${BASE_URL}/api/v1/collections/${id}`,
    data: {
      name,
      description,
      theme,
    },
  };
  return apiRequest(config);
};

export const deleteCollectionApi = (id) => {
  const config = {
    method: "DELETE",
    url: `${BASE_URL}/api/v1/collections/${id}`,
  };
  return apiRequest(config);
};
