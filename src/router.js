import { Router } from "express";
import accesstokenRouter from "./core/accesstoken/accesstoken.router.js";
import inquiryvaRouter from "./core/inquiryva/inquiryva.router.js";
import paymentvaRouter from "./core/paymentva/paymentva.router.js";
import testRouter from "./core/test/test.router.js";

const router = Router()

router.use("/test", testRouter)
router.use("/v1.0", accesstokenRouter)
router.use("/v1.0", inquiryvaRouter)
router.use("/v1.0", paymentvaRouter)

const appRouter = router;
export default appRouter;