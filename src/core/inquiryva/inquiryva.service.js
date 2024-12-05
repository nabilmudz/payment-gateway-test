import crypto from 'crypto';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import BaseService from "../../base/service.base.js";
import prism from "../../config/db.js";

class PaymentVirtualAccountService extends BaseService {
  constructor() {
    super(prism);
    this.clientKey = process.env.CLIENT_KEY;
    this.url = process.env.BASE_URL;
    this.privateKey = fs.readFileSync('./certs/private_key.pem', 'utf8');
  }

  generateSignature = (stringToSign) => {
    const signer = crypto.createSign('SHA256');
    signer.update(stringToSign);
    signer.end();
    return signer.sign(this.privateKey, 'base64');
  };

  inquireVirtualAccount = async (xauthorization, xTimestamp, xSignature, xPartnerId,xExternalId, xChannelId, payload) => {
    const header = {
      "authorization": xauthorization,
      "X-Timestamp": xTimestamp,
      "X-Signature": xSignature,
      "X-Partner-ID": xPartnerId,
      "X-External-Id": xExternalId,
      "Channel-Id": xChannelId,
    }
    
    const accessToken = xauthorization && xauthorization.split(' ')[1];
    if (!accessToken) {
        throw new Error("Access Token is missing.");
    }

    const decodedToken = this.validateAccessToken(accessToken);
    const clientKey = decodedToken.clientKey;

    const stringToSign = `POST:/v1.0/transfer-va/inquiry:${accessToken.toLowerCase()}:${this.minifyRequestBody(payload)}:${xTimestamp}`;
    const generatedSignature = this.generateSignature(stringToSign);

    if (xSignature !== generatedSignature) {
        throw new Error("Signature mismatch.");
    }

    const virtualAccountData = await this.processInquiry(payload);
    const response = {
      responseCode: "2002400",
      responseMessage: "Successful",
      virtualAccountData,
      
    }
    await this.db.inquiryVA.create({
      data: {
        date: new Date(),
        json_headers: header,
        json_payload: payload,
        json_response: response
      },
    });

    return response
  };

  minifyRequestBody = (body) => {
    return JSON.stringify(body).replace(/\s+/g, '');
  };

  validateAccessToken = (token) => {
    try {
      const decoded = jwt.verify(token, this.privateKey, { algorithms: ['RS256'] });
      return decoded;
    } catch (err) {
      console.log(err)
      throw new Error("Invalid Access Token");
    }
  };

  processInquiry = async (payload) => {
    const virtualAccountData = {
        partnerServiceId: payload.partnerServiceId,
        customerNo: payload.customerNo,
        virtualAccountNo: payload.virtualAccountNo,
        virtualAccountName: "Customer Name",
        inquiryRequestId: payload.inquiryRequestId,
        sourceBankCode: payload.sourceBankCode,
        totalAmount: {
            value: "10000.00",
            currency: "IDR",
        },
        trxDateTime: new Date().toISOString(),
        inquiryReason: {
            english: "Success",
            indonesia: "Sukses",
        },
        additionalInfo: payload.additionalInfo,
    };

    return virtualAccountData;
  };
};

export default PaymentVirtualAccountService;
