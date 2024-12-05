import BaseController from "../../base/controller.base.js";
import InquiryVAService from "./inquiryva.service.js";

class InquiryVAController extends BaseController {
  #service;

  constructor() {
    super();
    this.#service = new InquiryVAService();
  }

  inquireVirtualAccount = this.wrapper(async (req, res) => {
    const authorization = req.headers['authorization']
    const xTimestamp = req.headers['x-timestamp'];
    const xSignature = req.headers['x-signature']; 
    const xPartnerId = req.headers['x-partner-id'];
    const xExternalId = req.headers['x-external-id'];
    const xChannelId = req.headers['channel-id'];
    const data = await this.#service.inquireVirtualAccount(authorization, xTimestamp, xSignature, xPartnerId,xExternalId, xChannelId, req.body);
    return this.created(res, data, "InquiryVA berhasil dibuat");
  });

}

export default InquiryVAController;
