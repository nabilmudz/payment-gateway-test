import { Router } from "express";
import { baseValidator } from "../../base/validator.base.js";
import validatorMiddleware from "../../middlewares/validator.middleware.js";
import TestController from "./test.controller.js";
import TestValidator from "./test.validator.js";
const r = Router(),
  validator = TestValidator,
  controller = new TestController();

r.get(
  "/",
  validatorMiddleware({ query: baseValidator.browseQuery }),
  controller.findAll
);

r.get("/show-one/:id", controller.findById);

r.post(
  "/create",
  validatorMiddleware({ body: validator.create }),
  controller.create
);

r.put(
  "/update/:id",
  validatorMiddleware({ body: validator.update }),
  controller.update
);

r.delete("/delete/:id", controller.delete);

const testRouter = r;
export default testRouter;
