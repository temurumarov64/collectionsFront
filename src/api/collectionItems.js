import { apiRequest } from "./apiRequest";
import { BASE_URL } from "./baseUrl";

export const getAllCollectionItems = () => {
  const config = {
    method: "GET",
    url: `${BASE_URL}/api/v1/collectionItems/all`,
  };
  return apiRequest(config);
};

export const getRecentCollectionItemsApi = () => {
  const config = {
    method: "GET",
    url: `${BASE_URL}/api/v1/collectionItems/recent`,
  };
  return apiRequest(config);
};

export const createCommentApi = (comment, id) => {
  const config = {
    method: "POST",
    url: `${BASE_URL}/api/v1/comments/create-comment`,
    data: {
      comment,
      id,
    },
  };
  return apiRequest(config);
};

export const getCommentsByCollectionItemApi = (id) => {
  const config = {
    method: "GET",
    url: `${BASE_URL}/api/v1/comments/${id}`,
  };
  return apiRequest(config);
};

export const deleteCollectionItemApi = (id) => {
  const config = {
    method: "DELETE",
    url: `${BASE_URL}/api/v1/collectionItems/${id}`,
  };
  return apiRequest(config);
};

export const getItemBySearch = (search) => {
  const config = {
    method: "GET",
    url: `${BASE_URL}/api/v1/collectionItems/search-abd/${search}`,
  };
  return apiRequest(config);
};
