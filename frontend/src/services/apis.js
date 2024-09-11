// category
const BASE_URL = import.meta.env.VITE_BASE_URL||"http://localhost:4000/api/v1";
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/show-all-categories",
}

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",

  }

  //contact

  export const contact = {
    CONTACT_US_API: BASE_URL + "/contact/contact-us",
  }