import Joi from "joi";

export const AccessTokenValidator = {
  create: Joi.object({
    grantType: Joi.string().required()
  }),
  update: Joi.object({
    // no-data
  }),
};

export default AccessTokenValidator;
