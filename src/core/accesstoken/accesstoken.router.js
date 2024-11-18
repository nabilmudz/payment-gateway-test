import { Router } from "express";
import validatorMiddleware from "../../middlewares/validator.middleware.js";
import AccessTokenController from "./accesstoken.controller.js";
import AccessTokenValidator from "./accesstoken.validator.js";
const r = Router(),
  validator = AccessTokenValidator,
  controller = new AccessTokenController();

r.post(
  "/access-token/b2b",
  validatorMiddleware({ body: validator.create }),
  controller.getAccessToken
);

const accesstokenRouter = r;
export default accesstokenRouter;
