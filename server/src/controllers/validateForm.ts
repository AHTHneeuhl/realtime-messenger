import * as Yup from "yup";
import { Request, Response } from "express";

const formSchema = Yup.object({
  username: Yup.string()
    .required("Username required!")
    .min(6, "Username too short!"),
  password: Yup.string()
    .required("Password required!")
    .min(6, "Password too short!"),
});

export const validateForm = (req: Request, res: Response) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .then((valid) => {
      if (valid) {
        console.log("Valid");
      }
    })
    .catch((err) => {
      console.error(err.errors);
      res.status(422).send();
    });
};
