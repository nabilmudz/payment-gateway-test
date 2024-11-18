import BaseController from "../../base/controller.base.js";
import AccessTokenService from "./accesstoken.service.js";

class AccessTokenController extends BaseController {
  #service;

  constructor() {
    super();
    this.#service = new AccessTokenService();
  }

  getAccessToken = this.wrapper(async (req, res) => {
    const data = await this.#service.getAccessToken(req.body);
    return this.created(res, data, "AccessToken berhasil didapatkan");
  });

}

export default AccessTokenController;
