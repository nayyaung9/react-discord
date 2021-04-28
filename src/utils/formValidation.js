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

// server
export const createServerFormValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, "Server name should be at least 3 characters")
    .required("Server name is required"),
});

export const joinServerFormValidation = Yup.object().shape({
  serverId: Yup.string()
    .trim()
    .min(3, "Server Id should be at least 3 characters")
    .required("Server Id is required"),
});
// channel
export const createChannelFormValidation = Yup.object().shape({
  channel_name: Yup.string()
    .trim()
    .min(3, "Channel name should be at least 3 characters")
    .required("Channel name is required"),
});
