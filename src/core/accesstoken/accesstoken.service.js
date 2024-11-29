import crypto from 'crypto';
import fs from 'fs';
import BaseService from "../../base/service.base.js";
import prism from "../../config/db.js";

class AccessTokenService extends BaseService {
  constructor() {
    super(prism);
    this.clientKey = process.env.CLIENT_KEY
    this.url = process.env.BASE_URL
    this.privateKey = fs.readFileSync('./certs/key_sandbox', 'utf8');
  }

  generateSignature(clientID, timestamp) {
    const stringToSign = `${clientID}|${timestamp}`;
    const sign = crypto.createSign('SHA256');
    sign.update(stringToSign);
    sign.end();

    const signature = sign.sign(this.privateKey, 'base64');
    return signature;
  }
  
  getAccessToken = async (payload) => {
    const timestamp = new Date().toISOString();
    const signature = this.generateSignature(this.clientKey, timestamp);
    const user_id = "38yhykjr3h2i9ru" //example
    const app_id = 1; //example

    const headers = {
      'Content-Type': 'application/json',
      'x-client-key': this.clientKey,
      'x-timestamp': timestamp,
      'x-signature': signature,
    };

    const data = {
      grantType: payload.grantType,
    };

    try {
      const exResponse = {
        "responseCode": "2007300",
        "responseMessage": "Successful",
        "accessToken": 
        "AAIgM2U1ZjhiNTA3YWQyNjU5MWUzYjFmZDhlMWNjZTdiMjaAz_GyUy-pvwA2Of0GO1oDIVo6dMH1bqv6MXfZV9kV0wm9zHU6HgWCO03ktoD86Rl-uhBlVIDtW-Np1Q8oR-BYaupIOt783PeP0aR-zjNgtvoN55M7XKeDqltK6Ll7Z0-RnruHVyxA1wqE6cjJbRun",
        "tokenType": "Bearer",
        "expiresIn": "3600"
       } 
    const dbRecord = await this.db.accessToken.create({
      data: {
        app_id: app_id,
        user_id: user_id,
        date: new Date(),
        json_header: headers,
        json_payload: data,
        json_response: exResponse
      },
    });
      return exResponse;
    } catch (error) {
      throw new Error(`Failed to get access token: ${error.message}`);
    }

    // try {
    //   const response = await axios.post(this.url, data, { headers });
    //   return response.data;
    // } catch (error) {
    //   throw new Error(`Failed to get access token: ${error.message}`);
    // }
  };

}

export default AccessTokenService;  
