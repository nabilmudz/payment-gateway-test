import BaseController from "../../base/controller.base.js";
import InquiryVAService from "./inquiryva.service.js";

class InquiryVAController extends BaseController {
  #service;

  constructor() {
    super();
    this.#service = new InquiryVAService();
  }

  inquireVirtualAccount = this.wrapper(async (req, res) => {
    const data = await this.#service.inquireVirtualAccount(req.body);
    return this.created(res, data, "InquiryVA berhasil dibuat");
  });

}

export default InquiryVAController;
