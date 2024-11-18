import crypto from 'crypto';
import fs from 'fs';
import BaseService from "../../base/service.base.js";
import prism from "../../config/db.js";

class PaymentVirtualAccountService extends BaseService {
  constructor() {
    super(prism);
    this.clientKey = process.env.CLIENT_KEY;
    this.url = process.env.BASE_URL;
    this.privateKey = fs.readFileSync('./certs/private.key', 'utf8');
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

  paymentVirtualAccount = async (payload) => {
    const timestamp = new Date().toISOString();
    const signature = this.generateSignature('POST', '/v1.0/transfer-va/payment', this.clientKey, payload, timestamp);
    const user_id = "38yhykjr3h2i9ru"; // example
    const app_id = 1; // example

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.clientKey}`,
      'X-Timestamp': timestamp,
      'X-Signature': signature,
      'X-Partner-Id': this.clientKey,
      'X-External-Id': `payment-${Date.now()}`,
      'Channel-Id': 'your_channel_id_here', 
    };

    try {
      // Dummy response for testing purposes
      const response = {
        responseCode: "2002500",
        responseMessage: "Successful",
        virtualAccountData: {
          partnerServiceId: " 14599",
          customerNo: payload.customerNo,
          virtualAccountNo: payload.virtualAccountNo,
          virtualAccountName: "Josua",
          paymentRequestId: payload.paymentRequestId,
          sourceBankCode: payload.sourceBankCode,
          paidAmount: {
            value: payload.paidAmount.value,
            currency: payload.paidAmount.currency,
          },
          trxDateTime: timestamp,
          paymentFlagReason: {
            english: "Success",
            indonesia: "Sukses",
          },
          additionalInfo: payload.additionalInfo,
        },
      };

      const dbRecord = await this.db.PaymentVA.create({
        data: {
          app_id: app_id,
          user_id: user_id,
          date: new Date(),
          json_headers: headers,
          json_payload: payload,
          json_response: response,
        },
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to process payment: ${error.message}`);
    }

    // Uncomment the following code when the real API endpoint is available
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
}

export default PaymentVirtualAccountService;
