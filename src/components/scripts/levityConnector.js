import { Helper } from "./paramInit.js";

export class LevityConnector {
  constructor() {
    // initialize Parameters
    const helper = new Helper();
    this.url = helper.initializeParam(
      "api_url",
      "https://api.levity.ai/v1/classifiers/e5daa225-741e-4389-bcfa-fa26bd1798b2/classify/"
    );
    this.token = helper.initializeParam(
      "token",
      "Token a49d93a1-bca1-4bfe-8c05-699754a68840"
    );
  }

  // call Levity API to classify text results
  async classifyTextFromLevity(text) {
    const payload = {
      text: text,
      externalContext: "myReferenceId",
    };

    const res = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
    });
    const json = await res.json();
    return json["predictions"]["results"];
  }

  // call Levity API to classify images with an URL by results
  async classifyURLFromLevity(imgurl) {
    const payload = {
      url: imgurl,
      externalContext: "myReferenceId",
    };

    const res = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
    });
    const json = await res.json();
    return json["predictions"]["results"];
  }

  // call Levity API to classify images with an URL by results
  async classifyFileFromLevity(dataurl) {
    const base64url = dataurl.split("base64,", 2)[1];
    const payload = {
      base64: base64url,
      externalContext: "myReferenceId",
    };

    const res = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
    });
    const json = await res.json();
    return json["predictions"]["results"];
  }

  static getTop5Confidences(results) {
    let data = [];

    for (let i = 0; i < Math.min(results.length, 5); i++) {
      data.push(results[i]["confidence"]);
    }
    return data; // [Math.random(), Math.random()]; //data;
  }

  static getTop5Labels(results) {
    let labels = [];

    for (let i = 0; i < Math.min(results.length, 5); i++) {
      labels.push(results[i]["labelName"]);
    }
    return labels; //["positive", "negative"]; //labels
  }
}
