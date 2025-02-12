export const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

export const login = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem("user");
};
