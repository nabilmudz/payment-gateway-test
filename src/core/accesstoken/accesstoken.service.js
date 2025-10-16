import crypto from 'crypto';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import BaseService from "../../base/service.base.js";
import prism from "../../config/db.js";

class AccessTokenService extends BaseService {
  constructor() {
    super(prism);
    this.clientKey = process.env.CLIENT_KEY;
    this.clientSecret = process.env.CLIENT_SECRET;
    this.baseUrl = process.env.BASE_URL;
    this.privateKey = fs.readFileSync('./certs/private_key.pem', 'utf8');
  }

  getAccessToken = async (clientKey, timestamp, clientSignature, payload) => {
    const headers = {
      "x-client-key": clientKey,
      "x-timestamp": timestamp,
      "x-signature": clientSignature,
      "Content-Type": "application/json",
    }

    const stringToSign = `${clientKey}|${timestamp}`;
    const generatedSignature = this.generateSignature(stringToSign);

    if (clientSignature !== generatedSignature) {
      throw new Error("Signature mismatch.");
    }

    const accessToken = this.generateAccessToken(clientKey, timestamp);
    const response = {
      responseCode: "2007300",
      responseMessage: "Successful",
      accessToken,
      tokenType: "Bearer",
      expiresIn: "3600",
    };
    await this.db.accessToken.create({
      data: {
        date: new Date(),
        json_header: headers,
        json_payload: payload,
        json_response: response
      },
    });
    return response;
  };
  
  isTimestampValid = (timestamp) => {
    const clientTime = new Date(timestamp);
    const currentTime = new Date();
    console.log(currentTime)
  
    const diff = Math.abs(currentTime - clientTime);
    console.log(diff <= 5 * 60 * 1000)
    return diff <= 5 * 60 * 1000;
  };

  generateSignature = (stringToSign) => {
    const signer = crypto.createSign('SHA256');
    signer.update(stringToSign);
    signer.end();
    return signer.sign(this.privateKey, 'base64');
  };

  generateAccessToken = (clientKey, timestamp) => {
    return jwt.sign(
      { clientKey, timestamp },
      this.privateKey,
      {
        algorithm: 'RS256',
        expiresIn: 3600,
      }
    );
  };
  
}

export default AccessTokenService;  