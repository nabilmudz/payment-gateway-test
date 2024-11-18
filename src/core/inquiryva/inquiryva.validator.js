import Joi from "joi";

export const InquiryVAValidator = {
  create: Joi.object({
    partnerServiceId: Joi.string().required(),
    customerNo: Joi.string().required(),
    trxDateInit: Joi.string().required(),
    sourceBankCode: Joi.string().required(),
    inquiryRequestId: Joi.string().required(),
    virtualAccountNo: Joi.string().required(),
    amount: Joi.object({
      value: Joi.string().required(),
      currency: Joi.string().required(),
    }).optional(),
    additionalInfo: Joi.object({
      remark: Joi.string().optional(),
      sourceAccountNo: Joi.string().optional(),
      sourceAccountName: Joi.string().optional(),
      paymentInterface: Joi.string().optional(),
      transferMethod: Joi.string().optional(),
    }).optional(),
  }),
  update: Joi.object({
    // no-data
  }),
};

export default InquiryVAValidator;
