//src/utils/HelperFunctions.js
export const getToken = () => {
  return localStorage.getItem("user_token")
}
export const removeToken = () => {
  localStorage.removeItem("user_token")
}
export const setToken = (val) => {
  localStorage.setItem("user_token", val)
}
