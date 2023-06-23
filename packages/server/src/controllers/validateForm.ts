import { Request, Response } from "express";
import { formSchema } from "@messenger/common";

export const validateForm = (req: Request, res: Response) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .then((valid) => {
      if (valid) {
        console.log("Valid");
        res.status(200).send();
      }
    })
    .catch((err) => {
      console.error(err.errors);
      res.status(422).send();
    });
};
