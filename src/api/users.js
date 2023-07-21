import { apiRequest } from "./apiRequest";
import { BASE_URL } from "./baseUrl";

export const getUsersApi = () => {
    const config = {
      method: "GET",
      url: `${BASE_URL}/api/v1/users`,
    };
    return apiRequest(config);
  };

  export const deleteUserApi = (id) => {
    const config = {
      method: "DELETE",
      url: `${BASE_URL}/api/v1/users/${id}`,
    };
    return apiRequest(config);
  };
  
  export const updateUserRoleApi = (id, role) => {
    const config = {
      method: "PUT",
      url: `${BASE_URL}/api/v1/users/${id}`,
      data: {
        role,
      },
    };
    return apiRequest(config);
  };