import BaseController from "../../base/controller.base.js";
import AccessTokenService from "./accesstoken.service.js";

class AccessTokenController extends BaseController {
  #service;

  constructor() {
    super();
    this.#service = new AccessTokenService();
  }

  getAccessToken = this.wrapper(async (req, res) => {
    const xClientKey = req.headers['x-client-key'];
    const xTimestamp = req.headers['x-timestamp'];
    const xSignature = req.headers['x-signature']; 
  
    const data = await this.#service.getAccessToken(xClientKey, xTimestamp, xSignature, req.body);
    return this.created(res, data, "AccessToken berhasil didapatkan");
  });

}

export default AccessTokenController;
