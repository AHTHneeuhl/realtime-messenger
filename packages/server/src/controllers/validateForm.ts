import { Request, Response } from "express";
import { formSchema } from "@messenger/common";

export const validateForm = (req: Request, res: Response, next: Function) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .then((valid) => {
      if (valid) {
        console.log("Valid");
        res.status(200).send();
        next();
      } else {
        res.status(422).send();
      }
    })
    .catch((err) => {
      console.error(err.errors);
      res.status(422).send();
    });
};
