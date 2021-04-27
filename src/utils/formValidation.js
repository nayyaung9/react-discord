import * as Yup from "yup";

export const loginFormValidation = Yup.object().shape({
  username: Yup.string().trim().required("Username is Required"),
  password: Yup.string().required("Password is Required"),
});

export const registerFormValidation = Yup.object().shape({
  username: Yup.string().trim().required("Username is Required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is Required"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must be same."
  ),
});
