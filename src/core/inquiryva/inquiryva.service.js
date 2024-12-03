import crypto from 'crypto';
import fs from 'fs';
import BaseService from "../../base/service.base.js";
import prism from "../../config/db.js";

class PaymentVirtualAccountService extends BaseService {
  constructor() {
    super(prism);
    this.clientKey = process.env.CLIENT_KEY;
    // this.url = process.env.BASE_URL;
    this.privateKey = fs.readFileSync('./certs/private_key.pem', 'utf8');
  }

  generateSignature(httpMethod, endpointUrl, accessToken, requestBody, timestamp) {
    const minifiedBody = JSON.stringify(requestBody).replace(/\s+/g, '');
    const hash = crypto.createHash('sha256').update(minifiedBody).digest('hex');
    const stringToSign = `${httpMethod}:${endpointUrl}:${accessToken}:${hash}:${timestamp}`;
    const signature = crypto.createHmac('sha512', this.privateKey)
      .update(stringToSign)
      .digest('base64');
    return signature;
  }

  inquireVirtualAccount = async (payload) => {
    const timestamp = new Date().toISOString();
    const signature = this.generateSignature('POST', '/v1.0/transfer-va/inquiry', this.clientKey, payload, timestamp);
    const user_id = "38yhykjr3h2i9ru" //example
    const app_id = 1; //example

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.clientKey}`,
      'X-Timestamp': timestamp,
      'X-Signature': signature,
      'X-Partner-Id': this.clientKey,
      'X-External-Id': payload.inquiryRequestId,
      'Channel-Id': '95221'
    };

    try {
      // Example
      const exResponse = {
        responseCode: "2002400",
        responseMessage: "Successful",
        virtualAccountData: {
          partnerServiceId: " 14599",
          customerNo: "886581590432307",
          virtualAccountNo: " 14599886581590432307",
          virtualAccountName: "Josua",
          inquiryRequestId: payload.inquiryRequestId,
          sourceBankCode: "110",
          totalAmount: {
            value: "10000.00",
            currency: "IDR"
          },
          trxDateTime: timestamp,
          inquiryReason: {
            english: "Success",
            indonesia: "Sukses"
          },
          additionalInfo: payload.additionalInfo
        }
      };

      // Store the request and response in the database
      const dbRecord = await this.db.inquiryVA.create({
        data: {
          app_id: app_id,
          user_id: user_id,
          date: new Date(),
          json_headers: headers,
          json_payload: payload,
          json_response: exResponse
        },
      });

      return exResponse; // Return the response
    } catch (error) {
      throw new Error(`Failed to inquire virtual account: ${error.message}`);
    }
  };  

    /*
    try {
      const response = await axios.post(`${this.url}/v1.0/transfer-va/payment`, payload, { headers });
      
      await this.db.PaymentVA.create({
        data: {
          app_id: app_id,
          user_id: user_id,
          date: new Date(),
          json_headers: headers,
          json_payload: payload,
          json_response: response.data,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to process payment: ${error.message}`);
    }
    */
};

export default PaymentVirtualAccountService;
