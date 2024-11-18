import Joi from "joi";

export const PaymentVAValidator = {
  create: Joi.object({
    partnerServiceId: Joi.string().required(),
    customerNo: Joi.string().required(),
    trxDateTime: Joi.string().isoDate().required(),
    sourceBankCode: Joi.string().required(),
    paymentRequestId: Joi.string().required(),
    virtualAccountNo: Joi.string().required(),
    paidAmount: Joi.object({
      value: Joi.string().required(),
      currency: Joi.string().required(),
    }).required(),
    referenceNo: Joi.string().optional(),
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

export default PaymentVAValidator;
