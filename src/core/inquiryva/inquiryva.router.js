import { Router } from "express";
import validatorMiddleware from "../../middlewares/validator.middleware.js";
import InquiryVAController from "./inquiryva.controller.js";
import InquiryVAValidator from "./inquiryva.validator.js";
const r = Router(),
  validator = InquiryVAValidator,
  controller = new InquiryVAController();

r.post(
  "/transfer-va/inquiry",
  validatorMiddleware({ body: validator.create }),
  controller.inquireVirtualAccount 
);

const inquiryvaRouter = r;
export default inquiryvaRouter;
