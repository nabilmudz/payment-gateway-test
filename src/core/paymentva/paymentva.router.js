import { Router } from "express";
import validatorMiddleware from "../../middlewares/validator.middleware.js";
import PaymentVAController from "./paymentva.controller.js";
import PaymentVAValidator from "./paymentva.validator.js";
const r = Router(),
  validator = PaymentVAValidator,
  controller = new PaymentVAController();

r.post(
  "/transfer-va/payment",
  validatorMiddleware({ body: validator.create }),
  controller.paymentVirtualAccount
);

const paymentvaRouter = r;
export default paymentvaRouter;
