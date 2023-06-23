import * as Yup from "yup";

export const formSchema = Yup.object({
  username: Yup.string()
    .required("Username required!")
    .min(6, "Username too short!"),
  password: Yup.string()
    .required("Password required!")
    .min(6, "Password too short!"),
});
