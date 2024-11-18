import BaseController from "../../base/controller.base.js";
import PaymentVAService from "./paymentva.service.js";

class PaymentVAController extends BaseController {
  #service;

  constructor() {
    super();
    this.#service = new PaymentVAService();
  }

  paymentVirtualAccount = this.wrapper(async (req, res) => {
    const data = await this.#service.paymentVirtualAccount(req.body);
    return this.created(res, data, "PaymentVA berhasil dibuat");
  });

}

export default PaymentVAController;
