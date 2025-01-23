import joi from "joi";
import joiObjectId from "Joi-objectid";

export const sendMessageValdation = joi
  .object({
    message: joi.string().required(),
    rsiverid: joiObjectId(joi),
  })
  .options({ allowUnknown: false });

export const getMessageByIdValdation = joi
  .object({
    rsiverid: joiObjectId(joi),
  })
  .options({ allowUnknown: false });

export const deletMessageValdation = joi
  .object({
    messageid: joi.string().required(),
  })
  .options({ allowUnknown: false });
