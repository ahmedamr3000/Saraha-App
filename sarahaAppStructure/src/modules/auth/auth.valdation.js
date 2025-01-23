import joi from "joi";

export const signupValdation = joi
  .object({
    name: joi.string().min(3).max(10).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: ["com", "pro"] })
      .required(),
    password: joi
      .string()
      .pattern(/^[A-Za-z0-9]{3,8}$/)
      .required(),
    repassword: joi.string().valid(joi.ref("password")).required(),
  })
  .options({ allowUnknown: false });

export const loginValdation = joi
  .object({
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: ["com", "pro"] })
      .required(),
    password: joi
      .string()
      .pattern(/^[A-Za-z0-9]{3,8}$/)
      .required(),
  })
  .options({ allowUnknown: false });
