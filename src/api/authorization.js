import { apiRequest } from "./apiRequest";
import { BASE_URL } from "./baseUrl";

export const loginApi = (email, password) => {
  const config = {
    method: "POST",
    url: `${BASE_URL}/api/v1/users/login`,
    data: {
      email,
      password,
    },
  };
  return apiRequest(config);
};

export const signUpApi = (name, email, password) => {
  const config = {
    method: "POST",
    url: `${BASE_URL}/api/v1/users/signup`,
    data: {
      name,
      email,
      password,
    },
  };
  return apiRequest(config);
};
