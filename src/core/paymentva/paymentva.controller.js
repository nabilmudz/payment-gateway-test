import BaseController from "../../base/controller.base.js";
import PaymentVAService from "./paymentva.service.js";

class PaymentVAController extends BaseController {
  #service;

  constructor() {
    super();
    this.#service = new PaymentVAService();
  }

  paymentVirtualAccount = this.wrapper(async (req, res) => {
    const authorization = req.headers['authorization']
    const xTimestamp = req.headers['x-timestamp'];
    const xSignature = req.headers['x-signature']; 
    const xPartnerId = req.headers['x-partner-id'];
    const xExternalId = req.headers['x-external-id'];
    const xChannelId = req.headers['channel-id'];
    const data = await this.#service.paymentVirtualAccount(authorization, xTimestamp, xSignature, xPartnerId,xExternalId, xChannelId, req.body);
    return this.created(res, data, "PaymentVA berhasil dibuat");
  });

}

export default PaymentVAController;
